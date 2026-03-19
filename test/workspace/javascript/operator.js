
var a = 33;
var b = 10;
var c = "Test";
var linebreak = "<br />";

document.write("a = "+a);
document.write(linebreak);
document.write("b = "+b);
document.write(linebreak);
document.write("a + b = ");
result = a + b;
document.write(result);
document.write(linebreak);

document.write("a - b = ");
result = a - b;
document.write(result);
document.write(linebreak);

document.write("a / b = ");
result = a / b;
document.write(result);
document.write(linebreak);

document.write("a % b = ");
result = a % b;
document.write(result);
document.write(linebreak);

document.write("a + b + c = ");
result = a + b + c;
document.write(result); //??? ??? ?? ????? = 43test
document.write(linebreak);
a=a++;
document.write("a++ = "+a);
document.write(linebreak);
b=b--;
document.write("b-- = "+b);
document.write(linebreak);
a = ++a;
document.write("++a = ");
result = a;
document.write(result);
document.write(linebreak);

b = --b;
document.write("--b = ");
result = b;
document.write(result);
document.write(linebreak);
