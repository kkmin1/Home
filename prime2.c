#include <stdio.h>

// c에서는 bool type이 없기 때문에 만들어 줌
typedef enum {false, true} bool;

bool isPrime(int num); // 소수 판정 함수

int main()
{
    int i = 0, count = 0, max = 0;

    
    scanf("%d", &max);
    printf("%d까지 소수를 찾으세요: \n", max);
    printf("소수: ");

    for (i = 2; i <= max; i++)
    {
        if (isPrime(i))
        {
            printf("%d ", i);
            count++;
               if ((count % 8) == 0) // 소수 8개 단위로 줄바꿈
               printf("\n");
        }
    }

    printf("\n");
    printf("총 %d개의 소수를 찾았습니다!\n", count);

    return 0;
}

bool isPrime(int num)
{
    int i;

    for (i = 2; i * i <= num; i++)
    {
        if (num % i == 0)
            return false;
    }

    return true;
}


