import sys
input = sys.stdin.readline

n,m = map(int, input().split())


a = set(map(int, input().split()))  # 첫 번째 입력을 정수로 변환 후 집합에 추가
b = set(map(int, input().split()))  # 두 번째 입력을 정수로 변환 후 집합에 추가
print(len(a^b))