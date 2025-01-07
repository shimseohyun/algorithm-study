import sys
input = sys.stdin.readline

# 리스트 이용? 1 < n < 500,000 이면 for + is 쓰면 ... 크지 않나?
# 집합 -> 중복 가능하기에 불가
# 딕셔너리? 숫자 : 횟수로 
# 내장함수 count는 시간복잡도가 크다..
# count 딕셔너리 만들어서 따로 처리
n = int(input())
card_lst = list(input().split())

m = int(input())
user_card_lst = list(input().split())

count = {}

for card in card_lst:
    if card in count:
        count[card] += 1
    else:
        count[card] = 1

for ele in user_card_lst:
    if ele in count:
        print(count[ele] , end = " ")
    else:
        print(0 , end = " ")