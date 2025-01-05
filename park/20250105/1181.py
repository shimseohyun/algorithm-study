import sys

n = int(sys.stdin.readline().strip())
a = []
for i in range(n):
    a.append(sys.stdin.readline().strip())
#중복제거거
set_lst = set(a)
a = list(set_lst)
#길이 우선 정렬 , 같다면 사전 순 정렬
a.sort(key = lambda x: (len(x),x))

for i in a:
    print(i)