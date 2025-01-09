import sys
input = sys.stdin.readline
from collections import deque
n = int(input())
deq = deque()

structure = list(input().strip().split(" "))
lst = list(input().strip().split(" "))

m = int(input())
user_lst = list(input().strip().split(" "))

for i in range(n):
    # 큐
    if structure[i] == '0':
        deq.append(lst[i])
for i in range(m):
    deq.appendleft(user_lst[i])
    print(deq.pop() , end = " ")
