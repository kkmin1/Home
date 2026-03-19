#include <iostream>
#include <string>     // Need this header to use string class
#include <limits>
using namespace std;  // Also needed for <string>
 
int main() {
int age;
//  double weight;
  cin >> age;
//  cin >> weight;
  cout << "당신의 나이는" << age <<"살입니다."<< endl;

 
   // Input a word (delimited by space) into a string
   cout << "Enter a message (no space): ";
   cin >> message;
   cout << message << endl;
 
   cin.ignore(numeric_limits<streamsize>::max(), '\n');
      // flush cin up to newline (need <limits> header)
 
   // Input a line into a string
   cout << "Enter a message (with spaces): ";
   getline(cin, message);  // Read input from cin into message
   cout << message << endl;
   return 0;
}
