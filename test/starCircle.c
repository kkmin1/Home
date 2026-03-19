#include <stdio.h>

// 원형

int main()

{
int x, y, n = 10;

	for (int y=n; y>=-n; y--){
        for (int x=-n; x<=n; x++){
            if (x*x+y*y<=n*n+3)
                printf("*");
            else
                printf(" ");

        }
        printf("\n");
    }
    return 0;
}
// 모니터의 가로 세로 비율이 세로가 더 기므로 원이 생성되지 않고 세로로 긴 타원이 생성
