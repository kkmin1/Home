#include <stdio.h>

// 오른쪽 붙은 속빈 직각삼각형
int main()
{
int n = 10;

	for (int i=0; i<=n; i++){
        for (int j=0; j<=n; j++){
            if (i==n-j || j==0 || i==0) // j==0는 우변, i==0는 밑변 그리기 위함
               printf("*");
            else
               printf(" ");

        }
        printf("\n");
    }
    return 0;
}
