i=0
while i<=10:
  print(i)
  print(i, end='') # end='' for 개행
  i=i+1
print()

print("안녕" "하세요")
print("안녕"+"하세요")
print("안녕", "하세요") #,는 띄어쓰기
b=3
print("I eat %d apples." % b)

while True:
    a=int(input("숫자를 입력하세요: "))
# input는 입력하는 모든 것을 문자열로 취급한다. 숫자를 입력해도 문자로 취급하므로 숫자화하는 함수인 int()를 사용

    if a<=10:
        print("당신이 입력한 숫자는 %d 입니다." % a) # string과 변수 % a 사이에 ,가 잇으면 안됨. %와 a도 한칸 뜀.
        break
    else:
        print("10보다 작은 수를 입력하세요")
