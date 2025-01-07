import sys
input = sys.stdin.readline

n , m = map(int , input().split())
poc_dic = {}

# 번호 : 이름 , 이름 : 번호 딕셔너리 할당당
for i in range(1,n+1):
    poc = input().strip()
    poc_dic[i] = poc
    poc_dic[poc] = i

# 숫자 판별 후 value 출력
for i in range(m):
    search_poc = input().strip()
    if search_poc.isdigit():
        print(poc_dic[int(search_poc)])
    else:
        print(poc_dic[search_poc])
    
        