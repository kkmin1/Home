import java.util.*;

public class compareArray {

    public static void main(String[] args) {
        int i, j;
        
        List<Integer> list = new ArrayList<Integer>();
        
        for ( i = 1; i <= 16; i++) {
            list.add(i);
        }
        
        //System.out.println(list); //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        Collections.shuffle(list.subList(1, 15));
        System.out.println(list);
        
        Collections.replaceAll(list, 16, 0);
           System.out.println(list);
        
        
        // System.out.println(list); //[11, 5, 10, 9, 7, 0, 6, 1, 3, 14, 2, 4, 15, 13, 12, 8]
        

        int[][] a2 = new int[4][4];
        int[][] a3 = new int[4][4];
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {

                a2[i][j] = list.get(i * 4 + j);
                a3[i][j] = list.get(i * 4 + j);
            }

        }
        System.out.println("배열 a2");
        for (int[] row : a2) {
            System.out.print("[");
            for (int a : row)
                System.out.printf("%4d", a);
            System.out.println("]");
        }
        System.out.println("배열 a3");

        for (int[] row : a3) {
            System.out.print("[");
            for (int a : row)
                System.out.printf("%4d", a);
            System.out.println("]");
        }
        boolean check1 = Arrays.deepEquals(a2, a3);
        if (check1 == false)
            System.out.println("Arrays are not same.");
        else
            System.out.println("Both Arrays are same.");
    }
}