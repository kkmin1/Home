# 파일 이름에 turtle이 들어가면 안됨

import turtle as t

t.up() # 펜을 들음으로 그림이 그려지지 않음
t.goto(-400, 0) # (-200, 0)으로 그리지 않으면서 이동
t.down() # 펜을 내림으로 그림이 그려짐

# 선 그리기 
t.setpos(-300,160) # (-400, 0)에서 (-300, 60)으로 그리면서 이동

# 삼각형 그리기
t.up() 
t.goto(-200, 0) # (-200, 0)으로 그리지 않으면서 이동
t.down() 
t.color("blue")
t.pensize(3)
for i in range(3):
    t.forward(100)
    t.left(120)

t.up() 
t.goto(-160, -20) 
t.down() 
t.color("black")
t.pensize(10)
t.write("< 삼각형 >")

t.up() 
t.goto(0, 0) # (0, 0)으로 이동
t.down() 

# 사각형 그리기
t.color("red")
t.pensize(3)
for x in range(4):
    t.forward(100)
    t.left(90)

t.up() 
t.goto(200, 0)
t.down()

# 원그리기
t.color("green")
t.pensize(3)
t.circle(80) # 80은 원의 반지름

t.hideturtle() # 거북이 또는 화살표를 숨긴다.
t.exitonclick() # 그림 창이 자동으로 나가는 것을 방지. 그림 화면을 클릭하면 나간다.