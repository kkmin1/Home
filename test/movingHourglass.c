#include <stdio.h>
#include <stdlib.h>
#include <unistd.h> // sleep() 헤더파일. 윈도우용은 window.h

// 부등호 범위를 정하여 역피라미드를 만듬
	
// c에서는 bool type이 없기 때문에 만들어 줌
typedef enum {false, true} bool;

bool RevPyramid(int n, int x, int y, int k); // 역피라미드 내부면 참, 아니면 거짓

void gotoxy(int x,int y); // screen  (x,y)으로 이동


int main(){
	
int x, y, n =10;  
 //   scanf("%d", &n);

// 컴퓨터 화면은 4/4 분면이고 아래로 증가하므로 이를 적용
for(int k=0; k<=10; k++){
    gotoxy(0,0);
    for (int y=0; y>=-n; y--){
         for (int x=0; x<=2*n; x++){   
             if (RevPyramid(n,x,y,k))
                 printf("*");
             else
                 printf(" ");
    }
        printf("\n");
}
        sleep(1); // 1초 중지. windows용은 Sleep(1000)
    //    gotoxy(0,0);
   //     clearScr(10);
        
       
}
    return 0;
}

bool RevPyramid(int n, int x, int y, int k)
{
	// 역 피라미드 범위를 정한다.
	if (x<=n)
     if (y>=-x && y<-k)
        return true;
     else
        return false;
   else 
     if (y>=x-2*n && y<-k)
        return true;
     else
        return false;
}

// 화면의 x, y 좌표로 이동하는 함수
void gotoxy(int x,int y)
 {
 printf("%c[%d;%df",0x1B,y,x);
 }

