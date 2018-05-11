#include <stdio.h>


// 피라미드형

// 모니터 좌표는 x축 대칭이므로 y => -y
// 4/4분면의 피라미드 함수식
int pyramid(int x, int n){
    if (x <= n) return -(n-x) ;
    else return -(x-n) ;
}

int main()

{
int n = 10;

	for (int y=0; y>=-n; y--){
        for (int x=0; x<=2*n; x++){
            if (y<=pyramid(x, n))
                printf("*");
            else
                printf(" ");

        }
        printf("\n");
    }
    return 0;
}
