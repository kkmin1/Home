package exercise;

// 다이아몬드형 별찍기
import java.util.Scanner;

public class star {
 
    // @Date: 2016.06.07
    // @Developer: 손혁(elukasoul@gmail.com)
    // @Program Info: 중첩 반복문을 통한 별찍기 알고리즘
 
    public static void main(String[] args) {
 
     System.out.println("별찍기를 위한 정수를 입력하시오");
     Scanner input = new Scanner(System.in);
     int n = input.nextInt(); 
     // 상단 정삼각형을 출력하는 반복문
        for (int i = 0; i < n; i++) {
 
            for (int j = i; j < n; j++) {
                System.out.print(" ");
            }
            for (int j = 0; j < i; j++) {
                System.out.print("*");
            }
            for (int j = 0; j < i - 1; j++) {
                System.out.print("*");
            }
 
            System.out.println();
        }
 
        // 하단 역삼각형을 출력하는 반복문
        for (int i = 0; i < 5; i++) {
 
            for (int j = 0; j < i; j++) {
                System.out.print(" ");
            }
 
            for (int j = i; j < n; j++) {
                System.out.print("*");
            }
            for (int j = i + 1; j < n; j++) {
                System.out.print("*");
            }
 
            System.out.println();
        }
 
    }
 
}



