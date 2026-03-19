#include <stdio.h>

// 부등호 범위를 정하여 피라미드를 만듬
	
// c에서는 bool type이 없기 때문에 만들어 줌
typedef enum {false, true} bool;

bool quadrangle(int x, int y); // 피라미드 내부면 참, 아니면 거짓


int main(){
	
int x, y;  
int n = 20;
 //   scanf("%d", &n);

// 데카르트 좌표축 적용. 임의의 삼각형, x의 기울기가 1보다 작아질 수록 x,y의 범위가 커진다.
for (int y=n; y>=-n; y--){
    for (int x=0; x<=n; x++){
        if (quadrangle(x,y))
            printf("*");
        else
            printf(" ");
    }
        printf("\n");
}
    return 0;
}

bool quadrangle(int x, int y)
{
     if (y<=0 && x>=0 && y<=-2*x+10 && y>=-x-3.8)
        return true;
     else
        return false;
}




