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

           
n= int(input())
print("입력값:", n)
print()
print("<소수>")
sum = 0
for i in range(2,n+1):
     getPrime(i)
     sum = sum + count 

  
print()
print("소수갯수: ", sum)
