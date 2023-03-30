import numpy as np
from scipy.integrate import odeint
import matplotlib.pyplot as plt

def system(y, t):
    x, y = y
    dydt = [x - y, x - 2*y]
    return dydt

# Calculate eigenvectors
J = np.array([[1, -1], [1, -2]])
eigvals, eigvecs = np.linalg.eig(J)
eigvec1 = eigvecs[:, 0]
eigvec2 = eigvecs[:, 1]

# Calculate general solution
t_span = np.linspace(0, 10, 1000)
y0 = [1, 1]
sol = odeint(system, y0, t_span)

# Plot eigenvectors
plt.plot([0, eigvec1[0]], [0, eigvec1[1]], 'r', linewidth=1.5)
plt.plot([0, eigvec2[0]], [0, eigvec2[1]], 'r', linewidth=1.5)

# Plot solution trajectory
plt.plot(sol[:, 0], sol[:, 1], 'b', linewidth=1.5)

# Set plot limits and labels
plt.xlabel('x')
plt.ylabel('y')
plt.title('Phase Diagram')
plt.xlim([-2, 2])
plt.ylim([-2, 2])

plt.show()
