import matplotlib.pyplot as plt
import numpy as np
from scipy.integrate import odeint

# Define a function for the system of ODEs
def f(y, t):
    y1, y2 = y # unpack variables
    dydt = [-2*y1, 2*y1-4*y2+32] # define derivatives
    return dydt

# Define a grid of points for plotting
x = np.linspace(-16, 16, 21)
y = np.linspace(-16, 16, 21)
X, Y = np.meshgrid(x, y)

# Evaluate the system on the grid
t = np.linspace(0, 10, 101)
u, v = np.zeros(X.shape), np.zeros(Y.shape)
NI, NJ = X.shape
for i in range(NI):
    for j in range(NJ):
        xdot = f([X[i,j], Y[i,j]],t)
        u[i,j] = xdot[0]
        v[i,j] = xdot[1]

# Plot the vector field using quiver
plt.quiver(X,Y,u,v,color='r')

# Define a trajectory using an initial condition and odeint. # Plot the trajectory using plot
y1 = [15.0, 15.0]
y2 = [-15.0, -15.0]
y3 = [15.0, -15.0]
y4 = [-15.0, 15.0]
y5 = [15.0, 10.0]
y6 = [15.0, 5.0]
y7 = [-10.0, -15.0]
y8 = [-5.0, -15.0]
y9 = [0.0, -15.0]
y10 = [-10.0, 15.0]
y11 = [-5.0, 15.0]
y12 = [0.0, 15.0]
y13 = [5.0, 15.0]
y14 = [10.0, 15.0]

sol = odeint(f,y1,t)
plt.plot(sol[:,0], sol[:,1], 'b') # a[:,0]의 의미는 모든 행에 대해서 첫번째 열의 정보, a[:,1]의 의미는 모든 행에 대해서 두번째 열의 정보. plt.scatter(a[:,0], a[:,1]) 를 본다면 x축 가로, y축 세로로 보여달라는 의미
sol2 = odeint(f,y2,t)
plt.plot(sol2[:,0], sol2[:,1], 'b')
sol3 = odeint(f,y3,t)
plt.plot(sol3[:,0], sol3[:,1], 'b')
sol4 = odeint(f,y4,t)
plt.plot(sol4[:,0], sol4[:,1], 'b')
sol5 = odeint(f,y5,t)
plt.plot(sol5[:,0], sol5[:,1], 'b')
sol6 = odeint(f,y6,t)
plt.plot(sol6[:,0], sol6[:,1], 'b')
sol7 = odeint(f,y7,t)
plt.plot(sol7[:,0], sol7[:,1], 'b')
sol8 = odeint(f,y8,t)
plt.plot(sol8[:,0], sol8[:,1], 'b')
sol9 = odeint(f,y9,t)
plt.plot(sol9[:,0], sol9[:,1], 'b')
sol10 = odeint(f,y10,t)
plt.plot(sol10[:,0], sol10[:,1], 'b')
sol11 = odeint(f,y11,t) 
plt.plot(sol11[:,0], sol11[:,1], 'b')
sol12 = odeint(f,y12,t)
plt.plot(sol12[:,0], sol12[:,1], 'b')
sol13 = odeint(f,y13,t)
plt.plot(sol13[:,0], sol13[:,1], 'b')
sol14 = odeint(f,y14,t)
plt.plot(sol14[:,0], sol14[:,1], 'b')

# Show the plot
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.show()