import * as np from 'numpy';
import { odeint } from 'scipy.integrate';
import * as plt from 'matplotlib.pyplot';

function system(y, t, a, b, c, d) {
  const [x, y] = y;
  const dydt = [a * x - b * y, c * x - d * y];
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
const t_span = np.linspace(0, 10, 1000);

const sol1 = odeint(system, y1, t_span, a, b, c, d);
const sol2 = odeint(system, y2, t_span, a, b, c, d);
const sol3 = odeint(system, y3, t_span, a, b, c, d);
const sol4 = odeint(system, y4, t_span, a, b, c, d);

const x_min = -2;
const x_max = 2;
const y_min = -2;
const y_max = 2;
const x = np.meshgrid(np.linspace(x_min, x_max, 20), np.linspace(y_min, y_max, 20))[0];
const y = np.meshgrid(np.linspace(x_min, x_max, 20), np.linspace(y_min, y_max, 20))[1];
const u = np.zeros_like(x);
const v = np.zeros_like(y);


// calculate the vector field
for (let i = 0; i < x.shape[0]; i++) {
    for (let j = 0; j < y.shape[1]; j++) {
    let yprime = system([x[i, j], y[i, j]], 0, a, b, c, d)
    u[i, j] = yprime[0]
    v[i, j] = yprime[1]
    }
    }
    
    plt.figure(figsize=(8, 6))
    // calculate and plot eigenvectors
    let J = np.array([[a, -b], [c, -d]])
    let eigvals, eigvecs = np.linalg.eig(J)
    let eigvec1 = eigvecs[:, 0]
    let eigvec2 = eigvecs[:, 1]
    
    // calculate start and end points of eigenvector 1
    let x_start = 0
    let y_start = 0
    let x_end1 = eigvec1[0] * (x_max - x_min) / 2
    let y_end1 = eigvec1[1] * (y_max - y_min) / 2
    
    plt.plot([0, x_end1], [0, y_end1], 'r', linewidth=1.5)
    plt.plot([0, -x_end1], [0, -y_end1], 'r', linewidth=1.5)
    
    let x_mid1 = (x_start + x_end1) / 2
    let y_mid1 = (y_start + y_end1) / 2
    
    let arrow_start1a = [x_mid1, y_mid1]
    let arrow_end1a = arrow_start1a + 0.1 * np.array(system(arrow_start1a, 0, a, b, c, d))
    
    plt.arrow(arrow_start1a[0], arrow_start1a[1], arrow_end1a[0]-arrow_start1a[0], arrow_end1a[1]-arrow_start1a[1], head_width=0.05, head_length=0.05, color='#004d00')

    arrow_start1b = [-x_mid1, -y_mid1]
    arrow_end1b = arrow_start1b + 0.1 * np.array(system(arrow_start1b, 0, a, b, c, d))

    plt.arrow(arrow_start1b[0], arrow_start1b[1], arrow_end1b[0]-arrow_start1b[0], arrow_end1b[1]-arrow_start1b[1], head_width=0.05, head_length=0.05, color='g')

    // calculate start and end points of eigenvector 2
    let x_start2 = 0, y_start2 = 0;
    let x_end2 = eigvec2[0] * (x_max - x_min) / 2;
    let y_end2 = eigvec2[1] * (y_max - y_min) / 2;

    plt.plot([0, x_end2], [0, y_end2], 'r', linewidth=1.5);
    plt.plot([0, -x_end2], [0, -y_end2], 'r', linewidth=1.5);

    let x_mid2 = (x_start2 + x_end2) / 2;
    let y_mid2 = (y_start2 + y_end2) / 2;

    let arrow_start2a = [x_mid2, y_mid2];
    let arrow_end2a = arrow_start2a + 0.1 * np.array(system(arrow_start2a, 0, a, b, c, d));

    plt.arrow(arrow_start2a[0], arrow_start2a[1], arrow_end2a[0]-arrow_start2a[0], arrow_end2a[1]-arrow_start2a[1], head_width=0.05, head_length=0.05, color='#004d00')

    arrow_start2b = [-x_mid2, -y_mid2]
    arrow_end2b = arrow_start2b + 0.1 * np.array(system(arrow_start2b, 0, a, b, c, d))

    plt.arrow(arrow_start2b[0], arrow_start2b[1], arrow_end2b[0]-arrow_start2b[0], arrow_end2b[1]-arrow_start2b[1], head_width=0.05, head_length=0.05, color='g')

    // draw vector field
let arrowScale = 0.1;
let skip = 2;
for (let i = 0; i < x.length; i += skip) {
for (let j = 0; j < y.length; j += skip) {
let x0 = x[i];
let y0 = y[j];
let u0 = system([x0, y0], 0, a, b, c, d)[0];
let v0 = system([x0, y0], 0, a, b, c, d)[1];
plt.arrow(x0, y0, arrowScaleu0, arrowScalev0, head_width=0.05, head_length=0.05, color='gray');
}
}

// plot trajectories
plt.plot(sol1.map(x => x[0]), sol1.map(x => x[1]), 'b', linewidth=1.5);
plt.plot(sol2.map(x => x[0]), sol2.map(x => x[1]), 'b', linewidth=1.5);
plt.plot(sol3.map(x => x[0]), sol3.map(x => x[1]), 'b', linewidth=1.5);
plt.plot(sol4.map(x => x[0]), sol4.map(x => x[1]), 'b', linewidth=1.5);

// set axis labels, title, and axis limits
plt.xlabel('x');
plt.ylabel('y');
plt.title('Phase Diagram');
plt.xlim([x_min, x_max]);
plt.ylim([y_min, y_max]);

// display the plot
plt.show();