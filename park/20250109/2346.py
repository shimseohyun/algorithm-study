import sys
input = sys.stdin.readline
from collections import deque
# 덱의 rotate함수
# 양수는 시계방향 , 음수는 반시계방향 회전전
n = int(input())
balloon = []
deq = deque(enumerate(map(int, input().split())))
while deq:
    idx, change = deq.popleft()
    balloon.append(idx+1)
    if change > 0:
        deq.rotate(-(change-1))
    elif change < 0:
        deq.rotate(-change)
    
for i in balloon:
    print(i , end= " ")