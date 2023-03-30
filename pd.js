const odeint = require('ode45-cash-karp');
const linspace = require('linspace');
const { plot } = require('nodeplotlib');

function system(t, y, a, b, c, d) {
    const x = y[0];
    const y_ = y[1];
    const dydt = [a * x - b * y_, c * x - d * y_];
    return dydt;
}

const a = 1;
const b = 1;
const c = 1;
const d = 2;
const y1 = [1, 2];
const y2 = [-0.2, 2];
const y3 = [0.2, -2];
const y4 = [-1, -2];
const t_span = linspace(0, 10, 1000);

const sol1 = odeint(system.bind(null, a, b, c, d), y1, t_span);
const sol2 = odeint(system.bind(null, a, b, c, d), y2, t_span);
const sol3 = odeint(system.bind(null, a, b, c, d), y3, t_span);
const sol4 = odeint(system.bind(null, a, b, c, d), y4, t_span);

// ... rest of the code

const x_min = -2;
const x_max = 2;
const y_min = -2;
const y_max = 2;
const x = linspace(x_min, x_max, 20);
const y = linspace(y_min, y_max, 20);
const u = Array(x.length).fill(0);
const v = Array(y.length).fill(0);

// calculate the vector field
for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < y.length; j++) {
        const yprime = system(0, [x[i], y[j]], a, b, c, d);
        u[i] = yprime[0];
        v[i] = yprime[1];
    }
}

// calculate and plot eigenvectors
const J = [[a, -b], [c, -d]];
const eigvals = numeric.eig(J).lambda.x;
const eigvecs = numeric.eig(J).E.x;
const eigvec1 = eigvecs[0];
const eigvec2 = eigvecs[1];

// calculate start and end points of eigenvector 1
const x_start = 0;
const y_start = 0;
const x_end1 = eigvec1[0] * (x_max - x_min) / 2;
const y_end1 = eigvec1[1] * (y_max - y_min) / 2;

// ... rest of the code