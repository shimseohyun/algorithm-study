import sys

n = int(sys.stdin.readline().strip())
mem_lst = []

for _ in range(n):
    mem_lst.append(sys.stdin.readline().strip().split(" "))
#리스트를 공백 기준으로 딕셔너리 key, val로 할당당
mem_dic = {row[0]: row[1] for row in mem_lst}
# "leave" value로 가진 key 값들 따로 딕셔너리 생성
delete_mem = [key for key ,value in mem_dic.items() if value == "leave"]

#삭제
for key in delete_mem:
    del mem_dic[key]
#사전 역순으로 출력
for key in sorted(mem_dic.keys(), reverse= True):
    print(key)