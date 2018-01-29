# gets는 입력값 받는 메서드
# chomp는 입력값에서 앤터값을 제거하는 메서드

puts '이름을 영어로 입력하세요'
ename = gets.chomp 


puts '이름을 한글로 입력하세요'
hname = gets.chomp 
puts '나이를 입력하세요'
age = gets.chomp

puts "당신의 이름은 #{ename}이고 나이는 #{age}살입니다."
puts hname
puts "#{hname}"
print "당신의 이름은 ", hname,"이고 나이는 #{age}살입니다."
# 한글로 입력을 받는 경우 출력에 #{}로 연결하거나,  +로 연결하면 인코딩 에러남.
# 개별적으로 출력하면 에러 안남. ,로 연결하여의 개별적으로 출력.
# 따라서 puts를 쓰면 개별출력시 각각 개행이 일어나므로 print를 씀