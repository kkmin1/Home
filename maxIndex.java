import java.util.*;

public class maxIndex{
  
public static void getMaxIndex(int[] a, int n){

ArrayList<Integer> maxIndx = new ArrayList<Integer>();
int max = a[0];

// 최대값 구함
for(int i = 0; i < a.length; i++){
    if(a[i]>max) max = a[i];
}

// 최대값이 2개 이상일 수도 있으므로 위치를 구함.
for(int i = 0; i < a.length; i++){
    if(a[i] == max) maxIndx.add(i);
}
    System.out.println("최대값 : " + max);
    System.out.println("최대값의 위치 : " + maxIndx.toString());
 
for(int i = 0;i < maxIndx.size();i++)
    
    System.out.println(maxIndx.get(i));
}

public static void main(String[] args){
	
int a[] = {4, 34, 0, 0, 6, 34, 1};
int b[] = {3, 5, 27, 0, 1, 26, 27};

getMaxIndex(a, a.length);
getMaxIndex(b, b.length);
}
}