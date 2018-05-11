#include <stdio.h>

// 부등호 범위를 정하여 피라미드를 만듬
	
// c에서는 bool type이 없기 때문에 만들어 줌
typedef enum {false, true} bool;

bool triangle(int x, int y); // 피라미드 내부면 참, 아니면 거짓


int main(){
	
int x, y;  
 //   scanf("%d", &n);

// 데카르트 좌표축 적용. 임의의 삼각형, x의 기울기가 1보다 작아질 수록 x,y의 범위가 커진다.
for (int y=13; y>=-3; y--){
    for (int x=0; x<=21; x++){
        if (triangle(x,y))
            printf("*");
        else
            printf(" ");
    }
        printf("\n");
}
    return 0;
}

bool triangle(int x, int y)
{
     if (y>=3-0.3*x && y<=2*x+3 && y<=(-11/6)*x+55/3)
        return true;
     else
        return false;
}




