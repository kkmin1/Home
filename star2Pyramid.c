#include <stdio.h>

// 부등호 범위를 정하여 피라미드를 만듬
	
// c에서는 bool type이 없기 때문에 만들어 줌
typedef enum {false, true} bool;

bool Pyramid(int n, int x, int y); // 피라미드 내부면 참, 아니면 거짓


int main(){
	
int x, y, n =10;  
 //   scanf("%d", &n);

// 컴퓨터 화면은 4/4 분면이고 아래로 증가하므로 이를 적용
for (int y=0; y>=-n; y--){
    for (int x=0; x<=2*n; x++){
        if (Pyramid(n,x,y))
            printf("*");
        else
            printf(" ");
    }
        printf("\n");
}
    return 0;
}

bool Pyramid(int n, int x, int y)
{
	// 피라미드 범위를 정한다.
	if (x<=n)
     if (y<=x-n)
        return true;
     else
        return false;
   else 
     if (y<=n-x)
        return true;
     else
        return false;
}




