import sys
input = sys.stdin.readline

n = int(input())

for _ in range(n):
    stack = []
    str = input().strip()

    # for - else 구문 
    # else 구문은 for문이 정상적으로 종료 되었을 때 실행(break 없이)
    for val in str:
        if val == "(":
            stack.append(val)
        elif val ==")":
            if stack:
                stack.pop()
            else:
                print("NO")
                break
                
    else:
            if not stack:
                print("YES")
            else:
                print("NO")    