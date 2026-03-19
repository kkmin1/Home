# 왼쪽 붙은 직각삼각형
def leftRightTriangle(n):
    for i in range(1, n):
	    print ("*" * i)  # *를 i 개 찍어라

# 왼쪽 붙은 직각삼각형
def leftRightTriangle2(n):
# join 함수는 배열의 각 요소간에 특정 문자를 넣을 수 있게함.
# 아래에는 줄바꿈 문자
    print("\n".join("*" * i for i in range(1, 6)))

# 오른쪽 붙은 직각삼각형
def rightRightTriangle(n):
    for y in range (n, 0, -1): # n부터 0까지 1씩 감소
       print(y * ' ' + (n - y) * '*') # 공백을 y개, *를 n - y개 찍어라

# 왼쪽 붙은 역직각삼각형
def revLeftRightTriangle(n):
	print("\n".join("*" * i for i in range(n, 0, -1)))

# 오른쪽 붙은 역직각삼각형
def revRightRightTriangle(n):
	print("\n".join(" " * i + "*" * (n - i) for i in range(1, n)))


leftRightTriangle(6)
leftRightTriangle2(6)
rightRightTriangle(6)
revLeftRightTriangle(6)
revRightRightTriangle(6)