import numpy as np
from scipy.integrate import odeint
import matplotlib.pyplot as plt

# define system of differential equations
def dy_dt(y, t):
    a = 0
    b = 2.0
    c = -1.0
    d = 0
    
    y1, y2 = y
    
    dy1dt = a*y1 + b*y2
    dy2dt = c*y1 + d*y2
    
    return [dy1dt, dy2dt]

# initial conditions and time points
y0 = [1.0, 0.5]
t = np.linspace(0, 5)

# solve system of differential equations
y = odeint(dy_dt, y0, t)

# plot results (phase portrait)
plt.plot(y[:, 0], y[:, 1])
plt.xlabel('y1')
plt.ylabel('y2')

# add evenly distributed arrows along solution curve
arrow_freq = 5 # frequency at which to add arrows (every n-th point)
for i in range(1,len(t),arrow_freq):
    plt.arrow(y[i-1][0], y[i-1][1], y[i][0]-y[i-1][0], y[i][1]-y[i-1][1],
              shape='full', lw=0, length_includes_head=True,
              head_width=.05,  color='red')

plt.show()