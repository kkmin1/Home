class NegativeError(Exception):
    pass

#number가 소수이면 출력하는 함수
def getPrime(number):
    global count
    count = 0
    if number == 2: #2는 소수이므로 바로 출력
        print (number, end="")
        print(" ", end="") #공백 추가
    count = count + 1

    for x in range(2,number): #2부터 number-1까지 나누어 본다
        if number % x == 0: #나누어 떨어지면 소수가 아니므로 break
            count = 0
            break
        elif x == number - 1: #number-1까지 나누어지지 않으면 소수
            print(number, end="")
            print(" ", end="")
            count = 1

print("소수를 출력하는 프로그램입니다.")
print("범위를 나타내는 두 정수를 한 줄에 띄어써서 입력하세요")

m = 0
n = 0


while True:
  try:
     m, n = map(int, input().split()) 
  except ValueError:
     print("정수를 입력하세요!")
     continue
  else:
     # print("Yes an integer!")
     break 

print("입력값:", m, n)

print()
print("<소수>")
sum = 0
for i in range(m,n+1):
    getPrime(i)
    sum = sum + count
    if(sum % 10 == 0 and count == 1): # getPrime에서 count가 0일 때 빈줄이 생기지 않아야 한다.
       print()
    
print()
print("소수갯수: ", sum)
