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

# plot the phase diagram
plt.figure(figsize=(8, 6))
plt.quiver(x, y, u, v, color='gray')
plt.plot([-2, 2], [-1, 1], 'r--', linewidth=1.5)
plt.plot(sol[:, 0], sol[:, 1], 'b', linewidth=1.5)

# calculate and plot eigenvectors
A = np.array([[a, -b], [c, -d]])
eigenvalues, eigenvectors = np.linalg.eig(A)
for i in range(len(eigenvalues)):
    if np.imag(eigenvalues[i]) == 0:
        plt.arrow(0, 0, np.real(eigenvectors[0, i]), np.real(eigenvectors[1, i]),
                  head_width=0.05, head_length=0.1, fc='k', ec='k')

plt.xlabel('x')
plt.ylabel('y')
plt.title('Phase Diagram')
plt.xlim([x_min, x_max])
plt.ylim([y_min, y_max])
plt.show()
