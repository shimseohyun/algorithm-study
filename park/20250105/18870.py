import sys

n = int(sys.stdin.readline().strip())
lst = list(map(int ,sys.stdin.readline().strip().split()))

#중복제거
num_set= set(lst)
#오름차순 정렬렬
a = sorted(list(num_set))
dic = {}

#딕셔러니 키에 값들 넣어줌
for i in range(len(a)):
    dic[a[i]] = i

for i in lst:
    print(dic[i] , end = " ")
# -> 시간 초과 1 ≤ N ≤ 1,000,000 아마 이것 때문에 n^2의 시간복잡도로 발생
#lambda