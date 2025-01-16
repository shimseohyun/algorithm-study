/*
문제 : 사분면 고르기
x,y 좌표 받고 몇 사분면인지 출력하기
*/

#include<stdio.h>
int main() {
	int x, y;
	scanf("%d %d ", &x, &y); // x,y 값 입력

	if (x > 0 && y > 0) { // x ,y 값이 0 보다 크면 > 1 사분면 출력
		printf("1");
	}
	else if (x < 0 && y > 0) { // 2, 3 ,4 ~
		printf("2");
	}
	else if (x < 0 && y < 0) {
		printf("3");
	}
	else {
		printf("4");
	}
	return 0;

}