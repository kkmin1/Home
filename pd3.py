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
y0 = [-5, 5]
t_span = np.linspace(-10, 10, 1000)

sol = odeint(system, y0, t_span, args=(a, b, c, d))

x_min, x_max = -12, 12
y_min, y_max = -12, 12
x, y = np.meshgrid(np.linspace(x_min, x_max, 20), np.linspace(y_min, y_max, 20))
u, v = np.zeros_like(x), np.zeros_like(y)

# calculate the vector field
for i in range(x.shape[0]):
    for j in range(y.shape[1]):
        yprime = system([x[i, j], y[i, j]], 0, a, b, c, d)
        u[i, j] = yprime[0]
        v[i, j] = yprime[1]

plt.figure(figsize=(8, 6))
plt.quiver(x, y, u, v, color='gray')
plt.plot(sol[:, 0], sol[:, 1], 'b', linewidth=1.5)
plt.xlabel('x')
plt.ylabel('y')
plt.title('Phase Diagram')
plt.xlim([x_min, x_max])
plt.ylim([y_min, y_max])

# add general solution
lambda1 = (a - d + np.sqrt((a - d)**2 + 4*b*c)) / 2
lambda2 = (a - d - np.sqrt((a - d)**2 + 4*b*c)) / 2
v1 = [b, lambda1 - a]
v2 = [b, lambda2 - a]

if lambda1 != lambda2:
    c1 = 0  # you can choose any arbitrary value for c1 and c2 here
    c2 = 1
    general_solution = c1 * np.exp(lambda1 * t_span)[:, np.newaxis] * v1 + c2 * np.exp(lambda2 * t_span)[:, np.newaxis] * v2
    plt.plot(general_solution[:, 0], general_solution[:, 1], 'r--', label='General solution')
    plt.legend()

plt.show()
