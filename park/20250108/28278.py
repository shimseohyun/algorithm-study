import sys
input = sys.stdin.readline

#파이썬의 스택은 리스트로 구현이 된다.(연결리스트 없어도 가능)

n = int(input())
stack = []
for _ in range(n):
    num = input().split()
    if int(num[0]) == 1:
        stack.append(num[1])
    elif int(num[0]) == 2:
        if stack:
            print(stack.pop())
        else:
            print(-1)
    elif int(num[0]) == 3:
        print(len(stack))
    elif int(num[0]) == 4:
        if stack:
            print(0)
        else:
            print(1)
    elif int(num[0]) == 5:
        if stack:
            print(stack[-1])
        else:
            print(-1)