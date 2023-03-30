from sympy import Function, dsolve, Eq, symbols
from sympy.abc import t

# Define symbols and functions
y1 = Function('y1')
y2 = Function('y2')
a, b, c, d = symbols('a b c d')

# set values
a, b, c, d = 0, 1, -1, 0

# Define a system of ODEs
eq1 = Eq(y1(t).diff(t), a*y1(t) + b*y2(t))
eq2 = Eq(y2(t).diff(t), c*y1(t) + d*y2(t))

# Solve the system using dsolve
sol = dsolve([eq1, eq2], [y1(t), y2(t)])
print(sol)