#include <stdio.h>

// 부등호 범위를 정하여 피라미드를 만듬
	
// c에서는 bool type이 없기 때문에 만들어 줌
// typedef enum {false, true} bool;

void Pyramid(); 
void revPyramid();

int main(){

// 데카르트 좌표축 적용.y축 중심의 좌우대칭인 삼각형
Pyramid();
revPyramid();
    return 0;
}

// 별의 윗 삼각형
void Pyramid()
{
int n=5;

    for (int y=n; y>=0; y--){
    for (int x=-5*n; x<=5*n; x++){
        if (y<=x+n && y<=-x+n)
            printf("*");
        else
            printf(" ");
    }
        printf("\n");
}     
}

// 별의 아래 역삼각형
void revPyramid()
{    
int n=5; 
    for (int y=n; y>=-n; y--){
    for (int x=-5*n; x<=5*n; x++){
        if (y>=0.3*x-3 && y>=-0.3*x-3)
            printf("*");
        else
            printf(" ");
    }
        printf("\n");
}     
}


