# 코멘트
=begin 
여러줄 주석, = 앞에 공백이 있으면 안됨, = 와 begin 사이에 공백이 있으면 안됨
.....
......
=end

p 'hello!'
puts('hello, world')
puts '안녕하세요'; # 자동 개행
puts "처음 뵙겠습니다.";
print "내 이름은 민관기입니다."; # 자동 개행 안됨.

puts ''
print <<min # <<와 min 사이에 여백이 있으면 안됨. min은 임의의 식별자. 아무거나 쓰면됨
   이 행은 연습입니다.  공백도 그대로 출력됩니다.
       두 줄 이상 출력시 이렇게 하면 됩니다.
min

printf "여기에 %d개의 %s가 있읍니다.\n", 3, '사과' # 개행 \n 포함시 싱글 따옴표 안됨

var1="감사"
puts var1+"합니다."
name = "홍길동" 
puts "안녕하세요 #{name}님" #  변수명 앞에 #{}를 쓴다.

END { puts "Terminating Ruby Program" } # 코드가 맨 마지막에 수행됨
BEGIN { puts "Initializing Ruby Program" } # 코드가 맨 처음에 수행됨

name ='홍길동'
age = 22
# 변수가 숫자일 경우 문자와 +로 연결할 수 없다.
print "당신의 이름은 #{name}이고 나이는 #{age}살입니다.\n"
puts "당신의 이름은 #{name}이고 나이는 #{age}살입니다."