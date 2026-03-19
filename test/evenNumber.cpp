#include <iostream>

using namespace std;

int func(int a){
   if (a < 0) 
      cout << "양수를 입력하세요";
   
   else if (a%2 != 0) 
       cout << "홀수";
   else if (a%2 == 0 && a!=0)
       cout << "짝수";
   else 
       cout << "양수를 입력하세요";
       return 1;
   cout << endl;
}

int main (){

int num, c;


while(true){
  cin >> num;
  func(num);
}
  return 0;
}