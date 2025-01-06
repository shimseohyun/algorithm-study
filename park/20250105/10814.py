import sys

n = int(sys.stdin.readline().strip())
lst = []
for _ in range(n):
    age,name = map(str, sys.stdin.readline().strip().split())
    age = int(age)
    lst.append( (age, name))

lst.sort(key = lambda x: x[0])

for i in lst:
    print(i[0] , i[1])