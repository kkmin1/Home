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
y0 = [1, 1]
t_span = np.linspace(0, 10, 1000)

sol = odeint(system, y0, t_span, args=(a, b, c, d))

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
for i in range(len(eigvals)):
    eigvec = eigvecs[:,i]
    # normalize eigenvector
    eigvec = eigvec / np.linalg.norm(eigvec)
    
    # calculate start and end points of eigenvector
x_start, y_start = 0, 0
x_end = eigvec[0] * (x_max - x_min) / 2
y_end = eigvec[1] * (y_max - y_min) / 2
    
plt.plot([0, x_end], [0, y_end], 'r', linewidth=1.5)
plt.plot([0, -x_end], [0, -y_end], 'r', linewidth=1.5)

x_mid, y_mid = (x_start + x_end) / 2, (y_start + y_end) / 2
plt.arrow(0, 0, x_mid, y_mid, head_width=0.1, head_length=0.1, fc='r', ec='r')

#plt.arrow(0, 0, x_end, y_end, head_width=0.1, head_length=0.1, fc='r', ec='r')
#plt.arrow(0, 0, -x_end, -y_end, head_width=0.1, head_length=0.1, fc='r', ec='r')


plt.quiver(x, y, u, v, color='gray')
plt.plot(sol[:, 0], sol[:, 1], 'b', linewidth=1.5)
plt.xlabel('x')
plt.ylabel('y')
plt.title('Phase Diagram')
plt.xlim([x_min, x_max])
plt.ylim([y_min, y_max])
plt.show()
