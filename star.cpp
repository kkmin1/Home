#include <iostream>
#include <string>
using namespace std;

int main()
{
    int n = 5;

    string s((n + 1)*(n + 2)/2 - 1, '*'); // s(6,"*")는 *가 6개라는 의미
    for(int i = 1; i <= n; i++)
    {
        s[(i + 1)*(i + 2)/2 - 2]='\n';
    }

    cout<<s;
}