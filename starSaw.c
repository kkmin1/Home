#include <stdio.h>
#include <time.h>

// 톱니모양 무한 루프

void starSaw(int num){

  for (int i = 0; i < num; i++){
     printf("*");
  }
  printf("\n");
}

int main(){
  int h = 2;
  time_t end  = time(NULL) + 5; // 5초 후에 정지
  
  while(1){
    
    for (int i = 1; i <= 80; i = i + h){  // h의 크기는 가파름의 정도를 나타낸다.
      starSaw(i);
    }
    
    for (int i = 80; i >= 1; i = i - h){
      starSaw(i);
    }

    if (time(NULL) >= end) {
      break;
  }  
  
  }

  return 0;
}