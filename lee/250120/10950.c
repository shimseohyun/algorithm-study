#include <stdio.h>

int main() {
    int T, A, B;

    // 테스트 케이스의 개수 입력
    scanf("%d", &T);

    // T번 만큼 반복
    for (int i = 0; i < T; i++) {
        // 각 테스트 케이스에서 A와 B 입력
        scanf("%d %d", &A, &B);

        // A + B 출력
        printf("%d\n", A + B);
    }

    return 0;
}