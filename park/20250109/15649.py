import sys
input = sys.stdin.readline

n,m = map(int, input().strip().split(" "))
for i in range(1,n+1):
    for k in range(i,m+1):
        print(k , end = " ")
    print("\n")