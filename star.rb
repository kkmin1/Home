# 왼쪽 붙은 직각삼각형
# 아래 방식 모두 같은 결과

def leftRightTringle(n)
for i in 1..n
   puts("*" * i) # 개행
end
end

def leftRightTringle2(n)
n.times do
  |i| puts ("*" * (i+1)) # 5는 [0,1,2,3,4]를 의미
end
end

def leftRightTringle3(n)
n.times { |i| puts "*" * (i+1) }
end

def leftRightTringle4(n)
puts ((1..n).map{ |i| "*" * i }.join("\n"))
end

def leftRightTringle5(n)
(1..n).each{ |i| puts "*" * i}
end

n = 5
leftRightTringle(n)
leftRightTringle2(n)
leftRightTringle3(n)
leftRightTringle4(n)
leftRightTringle5(n)