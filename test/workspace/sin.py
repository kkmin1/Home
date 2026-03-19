import numpy as np
import matplotlib.pyplot as plt
X = np.linspace(-4, 4, 1024)
Y = np.sin(X)
plt.title('sin(x)')
plt.plot(X, Y, c = 'k')
plt.show()
