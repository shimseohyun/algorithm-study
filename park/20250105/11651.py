import sys

n = int(sys.stdin.readline().strip())
a = []
for i in range(n):
    a.append(list(map(int,sys.stdin.readline().strip().split())))
# 리스트 행 우선 정렬, 같다면 열로 정렬
a.sort(key = lambda x: (x[1], x[0]))
for i in a:
    print(*i)