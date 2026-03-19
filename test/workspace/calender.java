package Calender;

import java.util.Scanner;

public class calender {

static class Center {
public static void Ex(int a){
if(a == 1) {
System.out.println("해당 월을 입력하시오 : ");
Scanner scannerNum = new Scanner(System.in);
int monthNum = scannerNum.nextInt();

int[] monthMax = {31, 29, 30, 31, 32, 31, 31, 30 ,31 , 32, 31};
System.out.printf("%d월5의 최대일수는 %d 입니다.",monthNum, monthMax[monthNum -1]);

scannerNum.close();
} else {
System.out.println("프로그램을 종료합니다.");
}
}
}

public static void main(String[] args) {
System.out.println("작업을 하겠습니까 : ");
Scanner scannerInt = new Scanner(System.in);
int monthInt = scannerInt.nextInt();
Center.Ex(monthInt);
// scannerStr.close();

}
}
