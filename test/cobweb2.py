import matplotlib.pyplot as plt
from numpy import cos, linspace
    
def cobweb(f, g, x0, N, a=0, b=8):
       
        # plot the function being iterated
        t = linspace(a, b, N)
        plt.plot(t, f(t), 'r')

        # plot the supply curve
        plt.plot(t, g(t), 'b')
    
        # plot the iterates
        x, y = x0, f(x0)
        for _ in range(N):
            fy = f(y)        
            plt.plot([x, y], [y,  y], 'b', linewidth=1)
            plt.plot([y, y], [y, fy], 'b', linewidth=1)
            x, y = y, fy 
        
        plt.show()
            
         
def dem(x):
    return 5-0.7*x      
def sup(x):
    return x+1
def inv_sup(x):
    return x-1
   
cobweb(dem, sup, 1, 20)