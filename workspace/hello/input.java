import java.util.Scanner;

public class input {

public static void main(String []args) {

String name;
int age;
Scanner read = new Scanner(System.in);  // Scanner class에서 name 이라는 객체 생성

System.out.println("이름 : ");
name = read.nextLine(); // 줄 입력은 nextLine()
System.out.println("나이 : ");
age = read.nextInt(); // 입력값은 항상 문자이므로 이를 정수화함

System.out.println("당신의 이름은 "+name+"이고, 당신의 나이는 " +age+ "살입니다.");
read.close(); 

}
}
