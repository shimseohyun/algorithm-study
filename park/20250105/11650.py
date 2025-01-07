import sys

n = int(sys.stdin.readline().strip())
a = []
for i in range(n):
    a.append(list(map(int,sys.stdin.readline().strip().split())))
a = sorted(a)
for i in a:
    #리스트 괄호 없이 출력
    print(*i)