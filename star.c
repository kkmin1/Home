#include <stdio.h>

void star1(char, char, int); // 삼각형 1
void star2(char, char, int); // 삼각형 2
void star3(char, char, int); // 삼각형 3
void star4(char, char, int); // 삼각형 4
void star5(char, char, int); // 피라미드형
void star7(char, char, int); // 마름모
void star8(char, char, int); // 모래시계

int isValidLine(int);
int i, j, cnt = 0;
char star = '*'; // 단일 문자는 싱글 따옴표를 써야함
char spc = '-';
int num; // 홀수 입력

int main() {
	
	scanf("%d", &num);
	printf("정수 입력: %d\n\n", num);
	if (num <= 2 || num % 2 == 0){
	   printf("3 이상의 홀수를 입력하세요");
	   return 0;
	   }
	else
	star1(star, spc, num);
	star2(star, spc, num);
	star3(star, spc, num);
	star4(star, spc, num);
	star5(star, spc, num);
	star7(star, spc, num);
	star8(star, spc, num);
	return 0;
}

void star1(char ch1, char ch2, int line) {
	printf("%d. 왼쪽 붙은 직각삼각형\n", ++cnt);
	printf("\n");
	
	for (i = 0; i < line; i++) {
		for (j = 0; j < line; j++) {
			if (j <= i)
				printf("%c", ch1);
			else
				printf("%c", ch2);
		}
		printf("\n");
	}
	printf("\n");
}

void star2(char ch1, char ch2, int line) {
	printf("%d. 왼쪽 붙은 역직각삼각형\n", ++cnt);
	printf("\n");
	
	for (i = 0; i < line; i++) {
		for (j = line - 1; j >= 0; j--) {
			if (j >= i)
				printf("%c", ch1);
			else
				printf("%c", ch2);
		}
		printf("\n");
	}
	printf("\n");
}

void star3(char ch1, char ch2, int line) {
	printf("%d. 오른쪽 붙은 직각삼각형\n", ++cnt);
	printf("\n");
	
	for (i = 0; i < line; i++) {
		for (j = line - 1; j >= 0; j--) {
			if (j <= i)
				printf("%c", ch1);
			else
				printf("%c", ch2);
		}
		printf("\n");
	}
	printf("\n");
}

void star4(char ch1, char ch2, int line) {
	printf("%d. 오른쪽 붙은 역직각삼각형\n", ++cnt);
	printf("\n");
	
	for (i = 0; i < line; i++) {
		for (j = 0; j < line; j++) {
			if (j >= i)
				printf("%c", ch1);
			else
				printf("%c", ch2);
		}
		printf("\n");
	}
	printf("\n");
}

void star5(char ch1, char ch2, int line) {
	printf("%d. 피라미드형\n", ++cnt);
	printf("\n");
	
 for(i=0; i<line; i++)
 {
     for(j=0; j<line-1-i; j++)
         printf("%c", ch1); 
     for(j=0; j<i*2+1; j++)
         printf("%c", ch2);
      printf("\n");
 }
  printf("\n");
}
 
void star7(char ch1, char ch2, int line) {
	int k, l;

	printf("%d. 다이아몬드형\n", ++cnt);
	printf("\n");
	
	for (i = 0; i < line; i++) {
		for (j = 0; j < line; j++) {
			if (i > line / 2)
				k = i - line / 2;
			else
				k = line / 2 - i;
			if (j > line / 2)
				l = line - j - 1;
			else
				l = j;

			if (l >= k)
				printf("%c", ch1);
			else
				printf("%c", ch2);
		}
		printf("\n");
	}
	printf("\n");
}

void star8(char ch1, char ch2, int line) {
	int k, l;

	printf("%d. 모래시계형\n", ++cnt);
	printf("\n");
	
	for (i = 0; i < line; i++) {
		for (j = 0; j < line; j++) {
			if (i > line / 2)
				k = line - i - 1;
			else
				k = i;
			if (j > line / 2)
				l = line - j - 1;
			else
				l = j;

			if (l >= k)
				printf("%c", ch1);
			else
				printf("%c", ch2);
		}
		printf("\n");
	}
	printf("\n");
}
