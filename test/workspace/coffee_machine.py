coffee = 3
while True:
    money = int(input("돈을 넣어 주세요: "))
    if money == 300:
        print("맛있게 드십시오")
        coffee = coffee -1
        if not coffee:
            print("커피가 다 떨어졌습니다. 판매를 중지 합니다.")
            break
        print("커피는 %d개 남았읍니다." %coffee)
    elif money > 300:
        print("커피를 드립니다. 거스름돈은 %d원 입니다." % (money -300))
        coffee = coffee -1
        if not coffee:
            print("커피가 다 떨어졌습니다. 판매를 중지 합니다.")
            break
        print("커피는 %d개 남았읍니다." %coffee)
    else:
        print("돈이 부족합니다. 커피값은 300원입니다.")
        print("남은 커피의 양은 %d개 입니다." % coffee)

