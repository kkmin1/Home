#include <stdio.h>
int main() {
    FILE *fp;
    char c;
    
    printf("%s\n", __FILE__);
    fp = fopen(__FILE__,"r");
    do {
         c = getc(fp);
         putchar(c);
    }
    while(c != EOF);
    fclose(fp);
    return 0;
}