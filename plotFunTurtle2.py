# 파일 이름에 turtle이 들어가면 안됨

from turtle import Turtle, Screen

Screen().setup(500,500)


WIDTH, HEIGHT = 10, 10  # coordinate system size
tick = 0.1 # 그래프 그리기 위한 x 증분


# python의 기본 range함수는 실수 증분을 허용하지 않으므로 실수 증분을 가능하게 하는 myrange 함수를 만듬
def myrange(start, end, step):
    r = start
    while(r < end):
        yield r
        r += step

# 수식 그리는 함수
def plotter(turtle, x_range):
    turtle.penup()

    for x in x_range:
        y = (x-1)*(x-2)*(x-3) # 그리고 싶은 함수식을 적음 
        ivy.goto(x, y)
        turtle.pendown()

# 축 그리는 함수
def axis(turtle, distance):
    position = turtle.position()
    turtle.pendown()
    turtle.forward(distance)
    turtle.setposition(position)
    turtle.backward(distance)


screen = Screen()
screen.setworldcoordinates(-WIDTH/2, -HEIGHT/2, WIDTH//2, HEIGHT/2)

ivy = Turtle(visible=False)
ivy.speed('fastest')
ivy.penup()
axis(ivy, WIDTH)

ivy.penup()
ivy.home()
ivy.setpos((-0.3,-0.4))
ivy.write("0")
ivy.home()
ivy.setheading(90) #90도로 각도 전환
axis(ivy, HEIGHT)

plotter(ivy, myrange(-WIDTH//2, WIDTH//2, tick))

screen.exitonclick()