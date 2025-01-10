import sys
input = sys.stdin.readline
from collections import deque

n,k = map(int , input().split())
deq = deque()
for i in range(1,n+1):
    deq.append(i)
yoseph = []
while deq:
    for i in range(k-1):
        deq.append(deq.popleft())
    yoseph.append(deq.popleft())
print("<" , end="")
for i in yoseph:
    if i == yoseph[-1]:
        print(i , end = "")
    else:
        print(i , end = ", ")
print(">")