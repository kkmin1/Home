<?php $name = "민관기"; ?>

<html>
 <head>
  <title>PHP 테스트</title>
  	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 </head>
 <body>
 <?php 
echo '<p>Hello World</p>'; 
echo $name."님 안녕하세요<br>"; // string 연결은 .로 한다.
echo "$name 님 안녕하세요<br>"; // 이렇게 표현해도 된다. $name과 님 사이를 띄어야 함. 붙이면 '$name님'이 변수명이 됨.
?> 
	
 <?php
// if문

$num=20;
if($num%2==0){
    echo $num." is even number<br>";
    echo "$num 은 짝수입니다.<br>"; // 이렇게 표현해도 된다. $sum과 는 사이를 띄어야 함.
}
else{
    echo $num." is odd number";
}
?>

<?php
//for 문

$num=5;
for($i=1;$i<=12;$i++){
    echo $num."*".$i."=".$num*$i."<br>";
}

$odd_numbers = [1,3,5,7,9];
foreach ($odd_numbers as $odd_number) {
  echo $odd_number."<br>";
}

for($i=1;$i<=10;$i++){
    echo $i."<br>";
    if($i==5){
        break; // i=5에서 계산종료
    }}
    
$num = 10;
do {
    if($num==15){
        // skip the iteration.
        $num=$num+1;
        continue;     // num=15를 건너뛴다..
    }       
    echo " value of num: ".  $num ."<br>";
    $num = $num + 1;
   }
   while(  $num < 20 );
?>

 </body>
</html>




