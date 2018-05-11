#include<stdio.h>
#include<unistd.h>

 void clearScreen();

int main(){
    printf("hello c");
    sleep(3);
//    clearScreen();
    clrscr();
return 0;
}

void clearScreen(){
   for(int i = 0 ; i < 80 ; i++)
        printf("\n");
}

void clrscr(void)
{
    write (1, "\033[1;1H\033[2J", 10);
}
