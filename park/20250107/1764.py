import sys
input = sys.stdin.readline

n,m = map(int, input().strip().split())
a = set(input().strip() for _ in range(n))
b = set(input().strip() for _ in range(m))
print(len(a&b))
for i in sorted(a&b):
    print(i)
