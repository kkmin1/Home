# 주석

print("Hello, python!") # 자동 줄바꿈 
print("안녕하세요!")
print("홍길동", end="") # 자동 줄바꿈 안함
print("님")

name = "홍길동"
age = 21
print("당신의 이름은 "+ name +"이고 나이는 "+ str(age)+"살입니다.")
# age는 숫자이므로 유형에러를 방지하기 위해 str 함수로 문자화한다.
print("당신의 이름은",name ,"이고 나이는",age,"살입니다.")
# ,로 연결하면 개별적으로 실행하므로 유형에러가 안 생김. 단 공백 자동 추가
