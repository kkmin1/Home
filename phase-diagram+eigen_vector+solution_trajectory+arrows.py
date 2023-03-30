import numpy as np
from scipy.integrate import odeint
import matplotlib.pyplot as plt

def system(y, t, a, b, c, d):
    x, y = y
    dydt = [a*x - b*y, c*x - d*y]
    return dydt

a = 1
b = 1
c = 1
d = 2
y1 = [1, 2]
y2 = [-0.2, 2]
y3 = [0.2, -2]
y4 = [-1, -2]
t_span = np.linspace(0, 10, 1000)

sol1 = odeint(system, y1, t_span, args=(a, b, c, d))
sol2 = odeint(system, y2, t_span, args=(a, b, c, d))
sol3 = odeint(system, y3, t_span, args=(a, b, c, d))
sol4 = odeint(system, y4, t_span, args=(a, b, c, d))

x_min, x_max = -2, 2
y_min, y_max = -2, 2
x, y = np.meshgrid(np.linspace(x_min, x_max, 20), np.linspace(y_min, y_max, 20))
u, v = np.zeros_like(x), np.zeros_like(y)

# calculate the vector field
for i in range(x.shape[0]):
    for j in range(y.shape[1]):
        yprime = system([x[i, j], y[i, j]], 0, a, b, c, d)
        u[i, j] = yprime[0]
        v[i, j] = yprime[1]

plt.figure(figsize=(8, 6))
# calculate and plot eigenvectors
J = np.array([[a, -b], [c, -d]])
eigvals, eigvecs = np.linalg.eig(J)
eigvec1 = eigvecs[:, 0]
eigvec2 = eigvecs[:, 1]

# calculate start and end points of eigenvector 1
x_start, y_start = 0, 0
x_end1 = eigvec1[0] * (x_max - x_min) / 2
y_end1 = eigvec1[1] * (y_max - y_min) / 2
    
plt.plot([0, x_end1], [0, y_end1], 'r', linewidth=1.5)
plt.plot([0, -x_end1], [0, -y_end1], 'r', linewidth=1.5)

x_mid1, y_mid1 = (x_start + x_end1) / 2, (y_start + y_end1) / 2

arrow_start1a = [x_mid1, y_mid1]
arrow_end1a = arrow_start1a + 0.1 * np.array(system(arrow_start1a, 0, a, b, c, d))

plt.arrow(arrow_start1a[0], arrow_start1a[1], arrow_end1a[0]-arrow_start1a[0], arrow_end1a[1]-arrow_start1a[1], head_width=0.05, head_length=0.05, color='#004d00')

arrow_start1b = [-x_mid1, -y_mid1]
arrow_end1b = arrow_start1b + 0.1 * np.array(system(arrow_start1b, 0, a, b, c, d))

plt.arrow(arrow_start1b[0], arrow_start1b[1], arrow_end1b[0]-arrow_start1b[0], arrow_end1b[1]-arrow_start1b[1], head_width=0.05, head_length=0.05, color='g')

# calculate start and end points of eigenvector 2
x_start, y_start = 0, 0
x_end2 = eigvec2[0] * (x_max - x_min) / 2
y_end2 = eigvec2[1] * (y_max - y_min) / 2
    
plt.plot([0, x_end2], [0, y_end2], 'r', linewidth=1.5)
plt.plot([0, -x_end2], [0, -y_end2], 'r', linewidth=1.5)

x_mid2, y_mid2 = (x_start + x_end2) / 2, (y_start + y_end2) / 2

arrow_start2a = [x_mid2, y_mid2]
arrow_end2a = arrow_start2a + 0.1 * np.array(system(arrow_start2a, 0, a, b, c, d))

plt.arrow(arrow_start2a[0], arrow_start2a[1], arrow_end2a[0]-arrow_start2a[0], arrow_end2a[1]-arrow_start2a[1], head_width=0.05, head_length=0.05, color='#004d00')

arrow_start2b = [-x_mid2, -y_mid2]
arrow_end2b = arrow_start2b + 0.1 * np.array(system(arrow_start2b, 0, a, b, c, d))

plt.arrow(arrow_start2b[0], arrow_start2b[1], arrow_end2b[0]-arrow_start2b[0], arrow_end2b[1]-arrow_start2b[1], head_width=0.05, head_length=0.05, color='g')


plt.quiver(x, y, u, v, color='gray')
plt.plot(sol1[:, 0], sol1[:, 1], 'b', linewidth=1.5)
plt.plot(sol2[:, 0], sol2[:, 1], 'b', linewidth=1.5)
plt.plot(sol3[:, 0], sol3[:, 1], 'b', linewidth=1.5)
plt.plot(sol4[:, 0], sol4[:, 1], 'b', linewidth=1.5)
plt.xlabel('x')
plt.ylabel('y')
plt.title('Phase Diagram')
plt.xlim([x_min, x_max])
plt.ylim([y_min, y_max])
plt.show()
