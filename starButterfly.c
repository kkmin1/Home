#include <stdio.h>

// 나비모양
	
// c에서는 bool type이 없기 때문에 만들어 줌
typedef enum {false, true} bool;

bool isHourglass(int n, int x, int y); // 피라미드 내부면 참, 아니면 거짓


int main(){
	
int x, y, n =10;  
 //   scanf("%d", &n);

for (y=0; y>=-2*n; y--){
    for (x=0; x<=2*n; x++){
        if (isHourglass(n,x,y))
            printf("*");
        else
            printf(" ");
    }
        printf("\n");
}
    return 0;
}

bool isHourglass(int n, int x, int y)
{
	if (x<=n){
     if (y<=-x && y>=x-2*n)
        return true;
     else
        return false;
   }
   else {
     if (y<=x-2*n && y>=-x)
        return true;
     else
        return false;
   }
}




