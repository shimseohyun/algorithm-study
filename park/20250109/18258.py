import sys
from collections import deque
input = sys.stdin.readline
#list로 구현한 스택과 큐는 내장함수의 시간복잡도가 dequeue보다 크다
#dequeue 를 이용해서 스택과 큐를 구현하자..

dequeue = deque()

n = int(input())
for _ in range(n):
    command = list(input().strip().split(" "))
    if command[0] == 'push':
        dequeue.append(command[1])
    elif command[0] == 'pop':
        if len(dequeue) == 0:
            print(-1)
        else:
            print(dequeue.popleft())
    elif command[0] == 'size':
        print(len(dequeue))

    elif command[0] == 'empty':
        if len(dequeue) == 0:
            print(1)
        else:
            print(0)
    elif command[0] == 'front':
        if len(dequeue) == 0:
            print(-1)
        else:
            print(dequeue[0])
    elif command[0] == 'back':
        if len(dequeue) == 0:
            print(-1)
        else:
            print(dequeue[-1])
