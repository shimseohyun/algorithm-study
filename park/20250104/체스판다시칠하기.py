import sys
#화이트 체스판 가정 -> 블랙 체스판의 최소비용 + 화이트 체스판의 최소비용 = 8x8 이므로 64
#이를 이용하여 화이트 체스판을 가정하여 최소비용 계산
def getSol(startRow , startCol, array):
    boardOrignal = ["WBWBWBWB" , "BWBWBWBW"]
    whiteSol = 0
    for i in range(8):
        row = startRow + i
        for k in range(8):
            col = startCol + k
            if(array[row][col] != boardOrignal[row % 2][k]):    # boardOriginal을 2개 행으로 사용하였기에, 모듈러 연산을 통해 비교(나머지 0 or 1)
                whiteSol += 1
    return min(whiteSol,64 - whiteSol)                          # 둘 중 더 작은 값 리턴.


rows,cols = map(int , input().split())
array = [input() for _ in range(rows)]
# 1.체스판 자르기
sol = sys.maxsize
for i in range(rows - 7):
    for j in range(cols - 7):
        # 2. 현 체스판의 최소비용 구하기
        curSol = getSol(i,j,array)
        # 3. 값과 비교하여 갱신하기
        if sol > curSol:
            sol = curSol
print(sol)