import java.util.*;

class game{
  
public static void main(String[] args){
  
int g[][][] = {{{2,3},{-1,1}},
  {{1,0},{3,-2}}};

int p1[][] = new int[2][2];
int p2[][] = new int[2][2];

for(int i = 0; i < g.length; i++){
   for(int j = 0; j < g[0].length; j++){
       p1[j][i] = g[i][j][0] ;
       p2[i][j] = g[i][j][1] ;
    }
}
System.out.println("배열 p1 :" + Arrays.deepToString(p1)); // 2차원 배열을 문자열로 출력
System.out.println("배열 p2 :" + Arrays.deepToString(p2)); 
}
}