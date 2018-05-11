#include <stdio.h>

// 오른쪽 붙은 직각삼각형
int main()
{
int n = 10;

	for (int i=0; i<=n; i++){
        for (int j=0; j<=n; j++){
            if (i>=n-j)
                printf("*");
            else
                printf(" ");

        }
        printf("\n");
    }
    return 0;
}
