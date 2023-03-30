from matplotlib import pyplot as plt
import numpy as np



A = [5] # A국 초기 병력
B = [4] # B국 초기 병력
x = 5
y = 4
p = 0.01 # x의 교전비율
q = 0.01 # y의 교전비율

for i in range(0, 113):
        x0 = x
        x = x - q*y
        y = y - p*x0
        A.append(x)
        B.append(y)
      
# print(A)
# print(B)

n = np.arange(0,114)

plt.plot(n, A, '.r', label='A : remaining forces') # 선종류 ‘.’,  붉은색 ‘r’
plt.plot(n, B, '.b', label='B : remaining forces')
# plt.axis([0, 10, 0, 10])
plt.xlabel('number of turns')
plt.ylabel('remaining forces')
plt.title('Lanchester Model')
plt.legend(loc='upper right')
plt.annotate('approximate 3',xy=(113,3),xytext=(100,2), arrowprops=dict(facecolor='black', shrink=0.1, width=1))
plt.annotate('approximate 0',xy=(113,0),xytext=(100,1), arrowprops=dict(facecolor='black', shrink=0.1, width=1))
plt.show()
