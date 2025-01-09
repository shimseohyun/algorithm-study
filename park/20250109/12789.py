import sys
input = sys.stdin.readline

n = int(input())
student_lst = list(map(int, input().strip().split()))
wait_stack = []  # 대기 스택
ans_lst = []  # 최종적으로 완성될 리스트

# 순서대로 정렬된 리스트의 목표 상태
current_target = 1

for student in student_lst:
    # 스택에 학생을 추가
    wait_stack.append(student)

    # 대기 스택에서 정렬된 상태로 순서대로 이동 가능하면 이동
    while wait_stack and wait_stack[-1] == current_target:
        ans_lst.append(wait_stack.pop())
        current_target += 1

# 최종 결과 비교
if len(ans_lst) == n and ans_lst == list(range(1, n + 1)):
    print("Nice")
else:
    print("Sad")
