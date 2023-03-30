# Importing numpy library
import numpy as np

# Defining a 2x2 matrix
A = np.array([[4, 7], [2, 6]])

# Calculating the determinant of the matrix
det_A = np.linalg.det(A)

# Checking if the matrix is invertible
if det_A == 0:
    print("The matrix is not invertible")
else:
    # Calculating the inverse of the matrix
    A_inv = np.linalg.inv(A)
    print("The inverse of the matrix is:")
    print(A_inv)