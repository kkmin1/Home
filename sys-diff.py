from scipy.integrate import odeint
import numpy as np
import matplotlib.pyplot as plt


# Define a function for the ssoltem of ODEs
def f(y, t):
    y1, y2 = y # unpack variables
    dydt = [y2, -y1] # define derivatives
    return dydt

for n in [0, 0.5, 1, 1.5, 2, 2.5]:
    t = np.linspace(0, 10, 101)
    y0 = [0.0, n]
    sol = odeint(f, y0, t)
    plt.plot(sol[:,0], sol[:,1], 'b-') # path
#   plt.plot([sol[0,0]], [sol[0,1]], 'o') # start
#    plt.plot([sol[-1,0]], [sol[-1,1]], 's') # end

print(sol)
plt.show()
