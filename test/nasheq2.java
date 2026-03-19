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

import java.util.*;

public class nasheq2 {

    public static void printRow(int[][] row) {
        for (int[] i : row) {
            System.out.print(Arrays.toString(i));
            System.out.print("\t");
        }
        System.out.println();
    }

    public static void main(String args[]) {
        
        int strg1[][][] = new int[2][2][3]; // player1의 최적 전략. player2가 i 전략을 했을 때 player1의 최적 전략은 j이고 마지막 열은 최대보수
             // 가운데가 최대값이 같은 갯수를 의미하는데 이는 player1의 총전략갯수보다 작거나 같다.
        int strg2[][][] = new int[2][2][3]; // player2의 최적 전략
        
        // < 내쉬균형이 하나인 게임 >
            int g[][][] = {
                          {{2,3},{-1,1}},
                          {{2,0},{3,-2}}
                        };
            System.out.println("< 게임 행렬 >");

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
            int max1[] = new int[p1.length];
            max1[i] = p1[i][0]; // i 번째 행의 첫번째 값을 max로 지정

            // 각 행의 최대값과 위치를 구함
            for (int j = 0; j < p1[i].length; j++) { // j는 player1의 전략을 의미
                if (p1[i][j] >= max1[i]) 
                    max1[i] = p1[i][j];
            }

        // 최대값이 2개 이상일 수도 있으므로 최대값의 위치를 구함.
        ArrayList<Integer> maxIndx = new ArrayList<Integer>();

        for(int k = 0; k < p1[i].length; k++){
            if(p1[i][k] == max1[i]) maxIndx.add(k);
        }
        System.out.println("player1의 최대값 : " + max1[i]);
        System.out.println("위치 : " + maxIndx.toString());
            
        // player1 전략, 대응하는 player2 전략, player1 보수로 구성된 전략 행렬을 만듬
        int size1[] = new int[p1.length];
        size1[i] = maxIndx.size();
        
        for(int x = 0; x < size1[i]; x++){
            // 인덱스 0 부터 시작하는 것을 전략 1 부터 시작으로 바꿈
            strg1[i][x][1] = i+1;
            strg1[i][x][0] = maxIndx.get(x) + 1;
            strg1[i][x][2] = max1[i];
            System.out.println("player2가 " + strg1[i][x][1] + " 전략을 했을 때 player1의 최적 전략은 " + strg1[i][x][0] + " 이고 player1의 최대보수는 " + strg1[i][x][2]);
        }  
        maxIndx.clear(); // list의 모든 값을 삭제
    } // i 행 끝나는 부분
    System.out.println(Arrays.deepToString(strg1));

    // strg1 행렬의 인덱스를 확인하기 위해 시험 출력
    System.out.println("strg1.length : " + strg1.length);
    System.out.println("strg1[0].length : " + strg1[0].length);
    System.out.println("strg1[0][0].length : " + strg1[0][0].length);

        for(int i = 0; i < strg1.length; i++)
        for(int j = 0; j < strg1[0].length; j++)
        for(int k = 0; k < strg1[0][0].length; k++)
        
        System.out.println("strg1[" + i + "][" + j + "][" + k + "] : " + strg1[i][j][k] + " ");
        System.out.println();

    // 전략행렬을 행렬 형태로 출력
    System.out.println("\n< 전략행렬 >");

            for(int[][] row : strg1) {
                printRow(row);
            }
            System.out.println("");

    ///////////////////////////////////////////////////////////////////////////////////////////
        // player2의 행별 최대보수를 구함

        for (int i = 0; i < p2.length; i++) { // i는 player1의 전략을 의미
            int max2[] = new int[p2.length];
            max2[i] = p2[i][0]; // i 번째 행의 첫번째 값을 max로 지정

            for (int j = 0; j < p2[i].length; j++) { // j는 player2의 전략을 의미
                if (p2[i][j] >= max2[i]) 
                    max2[i] = p2[i][j];
            }

        // 최대값이 2개 이상일 수도 있으므로 최대값의 위치를 구함.
        ArrayList<Integer> maxIndx2 = new ArrayList<Integer>();

        for(int k = 0; k < p2[i].length; k++){
            if(p2[i][k] == max2[i]) maxIndx2.add(k);
        }
        System.out.println("player2 최대값 : " + max2[i]);
        System.out.println("위치 : " + maxIndx2.toString());
            
        // 전략 행렬을 만듬
        int size2[] = new int[p2.length];
        size2[i] = maxIndx2.size();
        
        for(int x = 0; x < size2[i]; x++){
            // 인덱스 0 부터 시작하는 것을 전략 1 부터 시작으로 바꿈
            strg2[i][x][0] = i+1;
            strg2[i][x][1] = maxIndx2.get(x) + 1;
            strg2[i][x][2] = max2[i];
            System.out.println("player1이 " + strg2[i][x][0] + " 전략을 했을 때 player2의 최적 전략은 " + strg2[i][x][1] + " 이고 player1의 최대보수는 " + strg2[i][x][2]);
        }  
        maxIndx2.clear(); // list의 모든 값을 삭제
    } // i 행 끝나는 부분
    System.out.println(Arrays.deepToString(strg2));

    System.out.println("\n< 전략행렬 >");

            for(int[][] row : strg2) {
                printRow(row);
            }
            System.out.println("");


        // 2차원 배열 strg1, strg2을 비교하여 맨 끝 보수열을 제외하고 같은 행이 있는지 찾는다.
        // 같은 행이 있다는 것은 양자의 최적 전략이 일치한다는 얘기이므로 그 전략이 내쉬균형이 된다.

        int colNum = 3; // strg1 행렬은 player1 전략, player2 전략, 보수로 구성되므로 항상 열수는 3개
        
        for (int i1 = 0; i1 < strg1.length; i1++ ) { // strg1의 i1 번째 행과
            for (int i2 = 0; i2 < strg2.length; i2++ ) { // strg2의 i2 번째 행 비교
                int count = 0;
                for (int j1 = 0; j1 < strg1[0].length; j1++ ) {
                    for (int j2 = 0; j2 < strg2[0].length; j2++ ) {
                        for (int k = 0; k < 2; k++){ 
                        
                        if(strg1[i1][j1][k] == strg2[i2][j2][k] && strg1[i1][j1][k] != 0) 
                            count++;
                        else
                            break;
                        }
                    }
                }
                if (count == colNum - 1) // 행에서 (n-1)개의 원소가 순서대로 모두 같으면 마지막 원소 제외 두 행이 같다는 의미이므로 내쉬균형전략.
                    System.out.println("내쉬균형은 player1이 " + strg1[i1][0][0] + " 전략, player2가 " + strg1[i2][0][1] + " 전략, 각자의 보수는 (" + strg1[i1][0][2] + ", " + strg2[i2][0][2] + ")");
                     
            }
        }
       
    }
} 
    

