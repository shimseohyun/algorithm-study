#include <stdio.h>

int main() {
    int T, A, B;

    // �׽�Ʈ ���̽��� ���� �Է�
    scanf("%d", &T);

    // T�� ��ŭ �ݺ�
    for (int i = 0; i < T; i++) {
        // �� �׽�Ʈ ���̽����� A�� B �Է�
        scanf("%d %d", &A, &B);

        // A + B ���
        printf("%d\n", A + B);
    }

    return 0;
}