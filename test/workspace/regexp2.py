import re
p = re.compile('[^./d]')
x = input()
m = p.search(x)
print(m)