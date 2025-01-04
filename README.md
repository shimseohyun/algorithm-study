## 플로우
**1. [로컬] repository 클론하기**
```
git clone https://github.com/shimseohyun/algorithm-study.git
```

**2. [로컬] 날짜에 맞는 branch 파기**
```
git checkout -b branch [오늘 날짜 (ex. 240101)]
```

**3. [로컬 -> git] 작업 올리기**
```
git add .
git commit -m "문제번호 - 문제이름"

git push origin [오늘 날짜 (ex. 240101)]
```

```md
study 브랜치에 pull request 올리기
main에 올리지 않게 조심해주세요! 메인에는 readme와 gitignore만 올리도록 합시다 
제발!!! 너의 코드까지 내 컴퓨터에 저장하고싶지 않다!
```

**4. [git] 상호 코드리뷰 후 `study branch`에 merge**

**5. [로컬] 내일의 작업을 위해 다시 main branch로 돌려두기**

