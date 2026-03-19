#include <stdio.h>
#include <unistd.h> // sleep() 헤더파일. 윈도우용은 window.h
 
int main( void ){
    printf( "HelloWorld\n" );
   
    sleep(3); // 3초 중지. windows용은 Sleep(3000)
    printf( "HelloWorld\n" );
 
    return 0;
}
