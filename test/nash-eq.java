/*
         * < 죄수의 딜렘마 게임 > 
         
         * p1/p2 |    1   |   2
         * -------------------------- 
         *   1   | (5,5)  | (0,10) 
         *   2   | (10,0) | (1,1)
         * --------------------------
         * 
         * < 치킨 게임 > 
         * 
           p1/p2 |   1    |   2
         * -------------------------- 
             1   | (0,0)  | (-5,5) 
             2   | (5,-5) | (-10,-10)
         * --------------------------
         * 
         * < 사슴사냥 게임 > 
         
         *  p1/p2 |   1   |   2
         * * -------------------------- 
         *    1   | (2,2) | (0,1) 
         *    2   | (1,0) | (1,1)
         * --------------------------
         
        * < 내쉬균형이 하나인 게임 > 
         
        *  p1/p2 |   1   |   2
        * * -------------------------- 
        *    1   | (2,3) | (-1,1) 
        *    2   | (1,0) | (3,-2)
        * --------------------------
        

        * < 3x3 게임 > 
         
        *  p1/p2 |   1   |   2  |   3
        * * ----------------------------
        *    1   | 3,0   | 3,4  |  1,3
        *    2   | 1,1   | 1,2  |  0,2
        *    3   | 4,2   | 2,3  |  3,0
        * ------------------------------
        */

        // < 죄수의 딜렘마 게임 >
        // int p1[][]= {{5,10}, {0,1}}; // player1의 보수. 열로 나열
        // int p2[][]= {{5,10}, {0,1}}; // player2의 보수. 행으로 나열

        // < 치킨 게임 >
        // int p1[][] = { { 0, 5 }, { -5, -10 } }; // player1의 보수. 열로 나열
        // int p2[][] = { { 0, 5 }, { -5, -10 } }; // player2의 보수. 행으로 나열

        // < 사슴사냥 게임 >
        // int p1[] []= {{2,1}, {0,1}}; // player1의 보수. 열로 나열
        // int p2[] []= {{2,1}, {0,1}}; // player2의 보수. 행으로 나열

        // < 내쉬균형이 하나인 게임 >
        // int p1[] []= {{2,1}, {-1,3}}; // player1의 보수. 열로 나열
        // int p2[] []= {{3,-1}, {0,-2}}; // player2의 보수. 행으로 나열

import java.util.*;

public class nash-eq {

    public static void printRow(int[][] row) {
        for (int[] i : row) {
            System.out.print(Arrays.toString(i));
            System.out.print("\t");
        }
        System.out.println();
    }

    public static void main(String args[]) {

        int strg1[][] = new int[2][3]; // player1의 최적 전략. player2가 i 전략을 했을 때 player1의 최적 전략은 j이고 마지막 열은 최대보수
        int strg2[][] = new int[2][3]; // player2의 최적 전략
        
        // < 내쉬균형이 하나인 게임 >
            int g[][][] = {{{2,3},{-1,1}},
              {{1,0},{3,-2}}};
            System.out.println("< 게임행렬 >");

            for(int[][] row : g) {
                printRow(row);
            }
        System.out.println("");

        // 내쉬균형 도출을 위해 game행렬을 player1, player2의 행렬로 나눈다.
            int p1[][] = new int[2][2];
            int p2[][] = new int[2][2];
            
            for(int i = 0; i < g.length; i++){
               for(int j = 0; j < g[0].length; j++){
                   p1[j][i] = g[i][j][0] ; // player1의 보수. 열로 나열하기 위해 전치(transpose)
                   p2[i][j] = g[i][j][1] ;
                }
            }

            // 2차원 배열을 문자열로 출력.  player1의 보수 열로 나열. player2의 보수 행으로 나열
            System.out.println("player1 배열 p1 :" + Arrays.deepToString(p1)); 
            System.out.println("player2 배열 p2 :" + Arrays.deepToString(p2));
            System.out.println(""); 
        
        // player1의 행별 최대보수를 구함

        for (int i = 0; i < p1.length; i++) { // i는 player2의 전략을 의미
            strg1[i][2] = p1[i][0]; // 배열 행의 첫번째 값을 max로 지정

            for (int j = 0; j < p1[i].length; j++) { // j는 player1의 전략을 의미
                if (p1[i][j] >= strg1[i][2]) {
                    strg1[i][2] = p1[i][j];
                    strg1[i][0] = j + 1;
                    strg1[i][1] = i + 1;
                    
                }
            }

            System.out.println("player2가 " + strg1[i][1] + " 전략을 했을 때 player1의 최적 전략은 " + strg1[i][0] + " 이고 player1의 최대보수는 " + strg1[i][2]);
        }

        // player2의 행별 최대보수를 구함

        for (int i = 0; i < p2.length; i++) { // i는 player1의 전략을 의미
            strg2[i][2] = p2[i][0]; // 배열의 첫번째 값을 max로 지정

            for (int j = 0; j < p2[i].length; j++) { // j는 player2의 전략을 의미
                if (p2[i][j] >= strg2[i][2]) {
                    strg2[i][2] = p2[i][j];
                    strg2[i][0] = i + 1;
                    strg2[i][1] = j + 1;
                    
                }
            }

            System.out.println("player1이 " + strg2[i][0] + " 전략을 했을 때 player2의 최적 전략은 " + strg2[i][1] + " 이고 player2의 최대보수는 " + strg2[i][2]);
        }

        System.out.println("strg1 : [player1 최적전략, player2 전략, player1 보수] :" + Arrays.deepToString(strg1)); // 2차원 배열을 문자열로 출력
        System.out.println("strg2 : [player1 전략, player2 최적전략, player2 보수] :" + Arrays.deepToString(strg2));

        // 2차원 배열 strg1, strg2에서 맨 끝 보수열을 제외하고 같은 행이 있는지 찾는다.
        // 같은 행이 있다는 것은 양자의 최적 전략이 일치한다는 얘기이므로 그 전략이 내쉬균형이 된다.

        int colNum=strg1[0].length;
        int rowNum=strg1.length;
        
        for (int i = 0; i < rowNum; i++ ) { // strg1의 i번째 행과
            for (int k = 0; k < rowNum; k++ ) { // strg2의 k번째 행 비교
                int count = 0;
                    for (int j = 0; j < colNum-1; j++){
                    if(strg1[i][j] == strg2[k][j]) 
                        count++;
                    else
                        break;
                }
                if (count == colNum - 1) // 행에서 (n-1)개의 원소가 순서대로 모두 같으면 마지막 원소제외 두 행이 같다는 의미이므로 내쉬균형전략.
                    System.out.println("내쉬균형은 player1이 " + strg1[i][0] + " 전략, player2가 " + strg1[i][1] + " 전략, 각자의 보수는 (" + strg1[i][2] + ", " + strg2[k][2] + ")");
                       
            }
        }
    }
} 
    

