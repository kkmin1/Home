import numpy as np
import matplotlib.pyplot as plt

def cobweb(x0, min_val, max_val, a, b, c, d, n, N):
    x = np.linspace(min_val, max_val, n)
    
    # define the demand function, supply function and inverse supply function
    def demand(x): 
        return a + b*x
    def supply(x):
        return c + d*x
    def inv_supply(y):
        return (y-c)/d
    
    # plot the demand and supply functions
    plt.plot(x, demand(x), 'r')
    plt.plot(x, supply(x), 'r')
    plt.axis([0, 10, 0, 10])
    
    # plot the initial point and the first iteration
    
    y0 = demand(x0)
    x1 = inv_supply(y0)
    y1 = demand(x1)

 # 초기점(x0,0)와 공급곡선상의 점(x0,y0)를 연결하는 cobweb선을 그림
 # plt.plot([x0, x0], [0, y0])

# 공급곡선상의 점(x0,y0)와 (x1,y0)를 연결하는 cobweb선을 그림
   # plt.plot([x0, x1], [y0, y0], c = 'g', linestyle = '--', linewidth = 1) 
    plt.arrow(x0, y0, x1-x0, y0-y0 ,head_width=0.1 ,head_length=0.1 ,color='green', linestyle = '--', linewidth = 0.5)
# 공급곡선상의 점(x1,y0)와 (x1,y1)를 연결하는 cobweb선을 그림
   # plt.plot([x1, x1], [y0, y1], c = 'g', linestyle = '--', linewidth = 1)
    plt.arrow(x1, y0, x1-x1, y1-y0 ,head_width=0.1 ,head_length=0.1 ,color='green', linestyle = '--', linewidth = 0.5)

    # plot the remaining iterations
    for i in range(N):
        y_i = demand(x1)
        x_j = inv_supply(y_i)
        y_j = demand(x_j)
        # plt.plot([x1, x_j], [y_i, y_i], c = 'g', linestyle = '--', linewidth = 1)
        # plt.plot([x_j, x_j], [y_i, y_j], c = 'g', linestyle = '--', linewidth = 1)
        plt.arrow(x1, y_i, x_j-x1, y_i-y_i ,head_width=0.1 ,head_length=0.1 ,color='green', linestyle = '--', linewidth = 0.5)
        plt.arrow(x_j, y_i, x_j-x_j, y_j-y_i ,head_width=0.1 ,head_length=0.05 ,color='green', linestyle = '--', linewidth = 0.5)
        x1 = x_j
        
    plt.title('Cobweb diagram of market', fontsize=18)
    plt.xlabel('quantity', fontsize=16)
    plt.ylabel('price', fontsize=16)
    plt.text(5, 5.5,"supply curve", fontsize = 14, color="Blue")
    plt.text(5, 2,"demand curve", fontsize = 14, color="Blue")
    plt.show()

x0 = 0.1 # 초기값
min_val = 0 # x,y 좌표축의 범위
max_val = 10
a = 5 # 수요함수 절편
b = -0.7 # 수요함수 기울기
c = 1 # 공급함수 절편
d = 1 # 공급함수 기울기
n = 10 
N = 10 # cobweb선 갯수
cobweb(x0, min_val, max_val, a, b, c, d, n, N)