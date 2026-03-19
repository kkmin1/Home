#include <stdio.h>

// 부등호 범위를 정하여 피라미드를 만듬
	
// c에서는 bool type이 없기 때문에 만들어 줌
typedef enum {false, true} bool;

bool isPyramid(int n, int x, int y); // 피라미드 내부면 참, 아니면 거짓


int main(){
	
int x, y, n =10;  
 //   scanf("%d", &n);

// 데카르트 좌표축 적용.y축 중심의 좌우대칭인 삼각형
for (int y=n; y>=0; y--){
    for (int x=-n; x<=n; x++){
        if (isPyramid(n,x,y))
            printf("*");
        else
            printf(" ");
    }
        printf("\n");
}
    return 0;
}

bool isPyramid(int n, int x, int y)
{
     if (y<=x+n && y<=n-x)
        return true;
     else
        return false;
}




