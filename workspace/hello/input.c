#include <stdio.h>

int main()
{
	char firstName[64],lastName[64];

	printf("성: ");
	scanf("%s",firstName);

	printf("이름: ");
	scanf("%s",lastName);

	printf("안녕 %s%s!!\n",firstName,lastName);

	return 0;
}
