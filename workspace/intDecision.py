class MyError(Exception):
    pass

def Negative(n):
    if (n<0):
        raise MyError()
  #  print(n)

userInput = 0
while True:
  try:
     n = int(input("정수를 입력하세요 : "))
     Negative(n)     
  except ValueError:
     print("정수를 입력하세요!")
     continue
  except MyError:
    print("양의 정수를 입력하세요.")
  else:
     print("정수입니다.")
     break 


    
