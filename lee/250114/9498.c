/*
���� :	���� ������ �Է¹޾� 90 ~ 100���� A, 80 ~ 89���� 
		B, 70 ~ 79���� C, 60 ~ 69���� D, ������ ������ F�� ����ϴ� ���α׷��� �ۼ��Ͻÿ�.
�Է� :	ù° �ٿ� ���� ������ �־�����. ���� ������ 0���� ũ�ų� ����, 100���� �۰ų� ���� �����̴�.
*/


#include<stdio.h>
int main() {
	int Grade;
	scanf("%d", &Grade);

	if (Grade >= 90) {
		printf("A");
	}
	else if (Grade >= 80) {
		printf("B");
		}
	else if (Grade >= 70) {
		printf("C");
	}
	else if (Grade >= 60) {
		printf("D");
	}
	else {
		printf("F");
	}
	return 0;
}