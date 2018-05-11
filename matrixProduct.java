package exercise;

import java.util.*;

// 매트릭스 곱을 구하는 프로그램
public class matrixProduct{
	
public static void main(String[] args){
int a[][] = {{1,2}, {3,4}};
int b[][] = {{1,0}, {-1,4}};
int prod[][] = new int [a.length][b[0].length];
 
prod = matrixMul(a,b);
System.out.println(Arrays.deepToString(prod));
}
 
 // 앞 행렬의 행과 뒤 행렬의 열을 곱해 두 행렬의 곱을 구함
 public static int[][] matrixMul(int[][] a, int[][] b)  
  { 
        int[][] ans=new int[a.length][b[0].length]; 
        int[][] b1=myTranspose(b);  
         
        for(int i=0; i<a.length;i++) 
        { 
              for(int j=0; j<b[0].length;j++) 
              { 
                    ans[i][j]=inner(a[i],b1[j]); 
             } 
      } 
      return ans; 
  } 
 
 // 두 벡터의 내적
  public static int inner(int[] a, int[] b) 
  { 
        int sum=0; 
        for(int k=0; k<a.length;k++) 
        { 
              sum=sum+a[k]*b[k]; 
       } 
       return sum; 
  } 
  
  // 행렬의 전치화
  public static int[][] myTranspose(int[][] a)  
  { 
        int[][] trs=new int[a[0].length][a.length]; 
                
        for(int i=0; i<trs.length;i++) 
        { 
              for(int j=0; j<trs[i].length;j++) 
              { 
                     trs[i][j]=a[j][i]; 
                    //System.out.print(trs[i][j]+" "); 
             } 
              
             //System.out.println(); 
      } 
      return trs; 
  } 
 }