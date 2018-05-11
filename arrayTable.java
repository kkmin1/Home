import java.util.*;

public class arrayTable {

    public static void printRow(int[][] row) {
        for (int[] i : row) {
            System.out.print(Arrays.toString(i));
            System.out.print("\t");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int g[][][] = {{{2,3},{-1,1}},
              {{1,0},{3,-2}}};

        for(int[][] row : g) {
            printRow(row);
        }
    }
}