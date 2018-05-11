# 파일 이름에 turtle이 들어가면 안됨

from turtle import Turtle, Screen

Screen().setup(500,500)


WIDTH, HEIGHT = 20, 20  # coordinate system size
tick = 0.1 # 그래프 증분

def myrange(start, end, step):
    r = start
    while(r < end):
        yield r
        r += step

def plotter(turtle, x_range):
    turtle.penup()

    for x in x_range:
        y = x**3 + 3 # 그리고 싶은 함수식을 적음 
        ivy.goto(x, y)
        turtle.pendown()

def axis(turtle, distance, tick):
    position = turtle.position()
    turtle.pendown()

    for _ in myrange(0, distance // 2, tick):
        turtle.forward(tick)
    #    turtle.dot()

    turtle.setposition(position)

    for _ in myrange(0, distance // 2, tick):
        turtle.backward(tick)
     #   turtle.dot()

screen = Screen()
screen.setworldcoordinates(-WIDTH/2, -HEIGHT/2, WIDTH//2, HEIGHT/2)

ivy = Turtle(visible=False)
ivy.speed('fastest')
ivy.penup()
axis(ivy, WIDTH, tick)

ivy.penup()
ivy.home()
ivy.setheading(90)
axis(ivy, HEIGHT, tick)

plotter(ivy, myrange(-WIDTH//2, WIDTH//2, tick))

screen.exitonclick()