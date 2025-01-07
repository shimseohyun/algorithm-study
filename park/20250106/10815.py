import sys
#입력받기
n = int(sys.stdin.readline())

# ~ in set 의 경우 시간복잡도 0(1) -> 해시 테이블 이용하기에. 따라서 총 시간 복잡도 O(N)
sangeun_set = set(map(int, sys.stdin.readline().strip().split()))
m = int(sys.stdin.readline())
is_lst = list(map(int, sys.stdin.readline().strip().split()))
for i in is_lst:
    if i in sangeun_set:
        print(1 , end = " ")
    else:
        print(0 , end = " ")


import sys
#입력받기
n = int(sys.stdin.readline())

sangeun_lst = list(map(int, sys.stdin.readline().strip().split()))
m = int(sys.stdin.readline())
is_lst = list(map(int, sys.stdin.readline().strip().split()))
for i in is_lst:
    if i in sangeun_lst:
        print(1 , end = " ")
    else:
        print(0 , end = " ")
# -> 시간초과 in 의 경우 O(n)이기에 총 O(N^2)이여서 ....