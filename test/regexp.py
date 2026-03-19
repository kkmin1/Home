from re import match,search,findall

str1 = r"spam" #r raw . \   
str = "eggspamsausagespam"

if match(srt1, str): #    
    print("Match")
else:
    print("No match")
# output : No match

if search(str1, str): #     
    print("Match")
else:
    print("No match")
# output  : Match

print(findall(str1, str)) #      
# ['spam','spam']

#  
tup = r"spam", "eggspamsausagespam"

def reFunc(f,p):
    if f(p[0],p[1]):
        print("Match")
    else:
        print("No match")

reFunc(match,tup) # output : No match
reFunc(search,tup) # output  : Match
reFunc(findall,tup) # output  : Match