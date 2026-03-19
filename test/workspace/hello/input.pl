
$name = <STDIN>;
$age = <>; # <>안의 stdin은 생략 가능
chomp $name; # chomp는 입력시 return키 제거 함수
chomp $age;
print "What is your name?\n";
print "안녕하세요, $name님\n";
print "당신의 나이는 $age살입니다.\n";