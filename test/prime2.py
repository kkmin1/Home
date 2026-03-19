import math
 
def getPrime(number):
    primeList = [2] #소수 리스트 생성
    num = 3 #3부터 소수인지 검사한다
    
    while (num <= number): 
        for x in primeList:
            if(num % x == 0): #소수로 나누었을 때 나누어지면 소수아님
                break
            elif(x == primeList[-1]): #소수리스트의 끝원소로도 나누어지지 않으면 소수
                primeList.append(num) #구한 소수를 소수리스트에 추가
                break
        num += 1
    
    if(number in primeList): #number가 소수리스트에 존재하면 소수인 것이므로
         print(number)

a = int(input())
getPrime(a)
