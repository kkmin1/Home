import matplotlib.pyplot as plt
import numpy as np
import matplotlib.lines as mlines
import matplotlib.patches as mpatches
from scipy.integrate import odeint

# < the Strogatz model >

def add_arrow_to_line2D(
    axes, line, arrow_locs=[0.2, 0.4, 0.6, 0.8],
    arrowstyle='-|>', arrowsize=1, transform=None):
    """
    Add arrows to a matplotlib.lines.Line2D at selected locations.

    Parameters:
    -----------
    axes: 
    line: Line2D object as returned by plot command
    arrow_locs: list of locations where to insert arrows, % of total length
    arrowstyle: style of the arrow
    arrowsize: size of the arrow
    transform: a matplotlib transform instance, default to data coordinates

    Returns:
    --------
    arrows: list of arrows
    """
    if not isinstance(line, mlines.Line2D):
        raise ValueError("expected a matplotlib.lines.Line2D object")
    x, y = line.get_xdata(), line.get_ydata()

    arrow_kw = {
        "arrowstyle": arrowstyle,
        "mutation_scale": 10 * arrowsize,
    }

    color = line.get_color()
    use_multicolor_lines = isinstance(color, np.ndarray)
    if use_multicolor_lines:
        raise NotImplementedError("multicolor lines not supported")
    else:
        arrow_kw['color'] = color

    linewidth = line.get_linewidth()
    if isinstance(linewidth, np.ndarray):
        raise NotImplementedError("multiwidth lines not supported")
    else:
        arrow_kw['linewidth'] = linewidth

    if transform is None:
        transform = axes.transData

    arrows = []
    for loc in arrow_locs:
        s = np.cumsum(np.sqrt(np.diff(x) ** 2 + np.diff(y) ** 2))
        n = np.searchsorted(s, s[-1] * loc)
        arrow_tail = (x[n], y[n])
        arrow_head = (np.mean(x[n:n + 2]), np.mean(y[n:n + 2]))
        p = mpatches.FancyArrowPatch(
            arrow_tail, arrow_head, transform=transform,
            **arrow_kw)
        axes.add_patch(p)
        arrows.append(p)
    return arrows


# Define a function for the system of ODEs
def f(y, t):
    y1, y2 = y # unpack variables
    dydt = [-1.5*y2, 0.5*y1] # define derivatives
    return dydt

# Define a grid of points for plotting
x = np.linspace(-25, 25, 30)
y = np.linspace(-25, 25, 30)
X, Y = np.meshgrid(x, y)

# Evaluate the system on the grid
t = np.linspace(0, 5, 20)
u, v = np.zeros(X.shape), np.zeros(Y.shape)
NI, NJ = X.shape
for i in range(NI):
    for j in range(NJ):
        xdot = f([X[i,j], Y[i,j]],t)
        u[i,j] = xdot[0]
        v[i,j] = xdot[1]

# Plot the vector field using quiver
# plt.quiver(X,Y,u,v,color='r')

fig, ax = plt.subplots(1, 1)
ax.quiver(X,Y,u,v,color='r')

u1 = np.linspace(-10, 10, 4)
v1 = np.linspace(-10, 10, 4)

initial_conditions = []
for i in range(len(u1)):
    for j in range(len(v1)):
        initial_conditions.append([u1[i], v1[j]])

lines = []
for y in initial_conditions:
    sol = odeint(f,y,t)
    line, = ax.plot(sol[:,0], sol[:,1], 'b')
    lines.append(line)

for line in lines:
    add_arrow_to_line2D(ax, line,
                        arrow_locs=[0.2, 0.4, 0.6,
                                    0.8, 1.0],
                        arrowstyle='->')
# Show the plot
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.grid(True)
plt.show()