import sys
input = sys.stdin.readline

str = input().strip()
str_set = set()

for i in range(len(str)):
    for m in range(i+1,len(str)+1):
        str_set.add(str[i:m])
print(len(str_set))


