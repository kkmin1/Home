#include <stdio.h>


// 피라미드형
//대칭이므로 4/4 분면의 피라미드는 1/4 분면의  y = |n -x|
//  y >= |n -x|의 영역을 그림

int pyramid(int x, int n){
    if (x <= n) return n-x ;
    else return x-n ;
}

int main()

{
int n = 10;

	for (int i=0; i<=n; i++){
        for (int j=0; j<=2*n; j++){
            if (i>=pyramid(j, n))
                printf("*");
            else
                printf(" ");

        }
        printf("\n");
    }
    return 0;
}
