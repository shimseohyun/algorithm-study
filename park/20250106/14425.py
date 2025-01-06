import sys
n_set = set()

n,m = map(int , sys.stdin.readline().split())
for _ in range(n):
    n_set.add(sys.stdin.readline().strip())

count = 0

for _ in range(m):
    m_val = sys.stdin.readline().strip()
    if m_val in n_set:
        count += 1
print(count)


