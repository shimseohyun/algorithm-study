/*
���� : ��и� ����
x,y ��ǥ �ް� �� ��и����� ����ϱ�
*/

#include<stdio.h>
int main() {
	int x, y;
	scanf("%d %d ", &x, &y); // x,y �� �Է�

	if (x > 0 && y > 0) { // x ,y ���� 0 ���� ũ�� > 1 ��и� ���
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