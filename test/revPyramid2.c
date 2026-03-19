#include <stdio.h>

// 부등호 범위를 정하여 피라미드를 만듬
	
// c에서는 bool type이 없기 때문에 만들어 줌
typedef enum {false, true} bool;

bool isPyramid(int x, int y); // 피라미드 내부면 참, 아니면 거짓


int main(){
	
int x, y, n =10;  
 //   scanf("%d", &n);

// 데카르트 좌표축 적용. 임의의 삼각형
for (int y=n; y>=-n; y--){
    for (int x=0; x<=8*n; x++){
        if (isPyramid(x,y))
            printf("*");
        else
            printf(" ");
    }
        printf("\n");
}
    return 0;
}

bool isPyramid(int x, int y)
{
     if (y>=10-0.5*x && y>=0.3*x-10)
        return true;
     else
        return false;
}




