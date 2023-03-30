import numpy as np
from scipy.integrate import odeint
import matplotlib.pyplot as plt

# Define the system of equations
def system(y, t):
    x, y = y
    dxdt = 2*x - y
    dydt = x + 3*y
    return [dxdt, dydt]

# Define the initial conditions
y0 = [1, 2]

# Define the time span for the solution
t = np.linspace(0, 10, 101)

# Solve the system of equations
sol = odeint(system, y0, t)

# Plot the solution
plt.plot(sol[:, 0], sol[:, 1])
plt.xlabel('x')
plt.ylabel('y')
plt.title('Phase diagram')
plt.show()
