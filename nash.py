# <Game 1>

"""
Consider the 2-player game given in Fig 1, which will be played by 2 players- Player A and Player B. Each player has 2 strategies each- Player A can play Top or Bottom and Player B can play Left or right.
"""

# pip install nashpy
import nashpy as nash
import numpy as np

A = np.array([[2,0],[4,2]]) # A is the row player
B = np.array([[4,2],[2,0]]) # B is the column player
game1 = nash.Game(A,B)

print("<NE of game1>") 
equil = game1.support_enumeration()
for eq in equil:
    print(eq) 

"""
<Nash Equilibrium>
Player A chooses strategy 2 i.e. 'Bottom' as given by '1' in the second position of the array and Player B chooses strategy 1 i.e. 'Left' as given by '1' in the first position of the array.
"""

print("") 
print("================================") 
print("") 

# <Game 2>

A = np.array([[4,0],[0,2]]) # A is the row player
B = np.array([[2,0],[0,4]]) # B is the column player
game2 = nash.Game(A,B)

print("<NE of game2>") 
equil = game2.support_enumeration()
for eq in equil:
    print(eq)

print("") 

# Calculate payoffs
print("<payoffs of the NE strategy>") 
p1 = np.array([.67,.33])
p2 = np.array([.33,.67])
pd = nash.Game(A, B)
print(pd[p1, p2])