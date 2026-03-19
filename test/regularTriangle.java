class Dcoder {
 
    // @Date: 2016.06.07
    // @Developer: 손혁(elukasoul@gmail.com)
    // @Program Info: 중첩 반복문을 통한 별찍기 알고리즘
 
    public static void main(String[] args) {
 
        for (int i = 0; i < 5; i++) {
 
            // 왼쪽 상단에 빈 공간을 출력하기 위한 반복문
            for (int j = i; j < 5; j++) {
                System.out.print("-");
            }
            // 정삼각형의 왼쪽 부분을 담당하는 반복문
            for (int j = 0; j < i; j++) {
                System.out.print("*");
            }
            // 정삼각형의 오른쪽 부분을 담당하는 반복문
            for (int j = 0; j < i - 1; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
 
    }
 
}
