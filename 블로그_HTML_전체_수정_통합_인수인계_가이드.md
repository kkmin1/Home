# GitHub Blog 전체 수정 작업 통합 인수인계 지침서

> 대상: Google Drive의 `github/blog` 전체 블로그 자료  
> 목적: 다음 세션에서 이전 작업 맥락을 잃지 않고, 같은 원칙과 품질 기준으로 블로그 정비를 계속하기 위한 통합 작업 지침  
> 범위: **이전 “블로그 수정” 세션 전체 + 경제수학/동학 HTML 재구성 작업**

---

# 0. 이 문서가 최우선으로 기억해야 할 것

이 프로젝트는 단순한 “HTML 예쁘게 고치기” 작업이 아니다.

핵심 목표는 다음과 같다.

> **사용자가 오랫동안 만들어 온 기존 블로그의 분류체계·파일명·내용·수식·표·이미지·링크를 최대한 보존하면서, 오류·미완성·깨진 링크·수식·스타일·가독성·구조를 점진적으로 개선하는 것**

따라서 작업 우선순위는 항상 다음 순서다.

```text
기존 구조 보존
> 기존 내용 보존
> 오류 수정
> 미완성 보강
> 링크 복원
> 수식/표/이미지 보존
> 모바일/가독성 개선
> 관련 문서 연결
> 필요 시 분할/재구성
> 새 글 작성
```

---

# 1. 사용자 지시 중 절대 바꾸면 안 되는 원칙

## 1.1 기존 분류체계를 임의로 바꾸지 않는다

특히 이전 “블로그 수정” 세션에서 사용자가 명시한 제약:

- 기존 분류체계 임의 변경 금지
- `인문수학` 하위항목 임의 변경 금지
- 파일명 변경 금지에 가깝게 보수적으로 접근
- 폴더 이동·삭제를 함부로 하지 않음
- 기존 내용을 대폭 삭제·재작성하지 않음

즉,

```text
"더 깔끔해 보인다"
"내가 보기엔 이 카테고리가 낫다"
```

라는 이유로 재분류하지 않는다.

---

## 1.2 파일은 작업 후 즉시 Drive 작업본에 반영한다

이전 세션에서 사용자가 명시:

> 작업한 파일은 이후 매 턴 즉시 Google Drive 작업본에 반영.

따라서 로컬에서 여러 파일을 오래 수정만 해두고 마지막에 한꺼번에 반영하는 방식보다:

```text
읽기
→ 수정
→ 검수
→ Drive 덮어쓰기
→ 다음 묶음
```

방식이 우선이다.

---

## 1.3 너무 잘게 쪼개서 작업하지 않는다

사용자 선호:

> 카테고리 단위로 한꺼번에 처리.

따라서:

```text
한 파일 수정 → 보고
한 파일 수정 → 보고
한 파일 수정 → 보고
```

보다는 다음처럼 한다.

```text
게임이론 카테고리 한 묶음
경제수학 II 한 묶음
위상도/동학 한 묶음
```

단, 파일이 매우 크고 위험하면 내부적으로 나눠 검수하되 사용자 관점에서는 의미 있는 카테고리 단위로 처리한다.

---


# 2. 기본 참고자료 저장소 — 반드시 먼저 확인

블로그를 수정하거나 보강할 때 **반드시 먼저 확인해야 하는 기본 참고자료 저장소**가 있다.

Google Drive:

```text
https://drive.google.com/drive/folders/1KoCAO-N8yCpwQ9X-17I_u9pSUhMZdorm
```

folder ID:

```text
1KoCAO-N8yCpwQ9X-17I_u9pSUhMZdorm
```

이 폴더는 선택적인 참고자료가 아니라 **블로그 수정 작업의 필수 기본 자료원**이다.

따라서 어떤 블로그 페이지를 수정할 때도 다음 원칙을 적용한다.

> **현재 blog HTML만 보고 수정하지 말고, 먼저 이 기본 참고자료 저장소에 대응되는 원본·HML·변환 HTML·media·conversion-report가 있는지 조사한다.**

그리고 참고자료에 현재 블로그보다 더 많은 내용이 있으면:

- 빠진 본문
- 빠진 설명
- 빠진 수식
- 빠진 표
- 빠진 그래프
- 빠진 이미지
- 빠진 각주
- 빠진 응용 사례

를 확인하여 **현재 블로그에 적절하게 추가·복원한다.**

즉 이 저장소의 역할은 단순한 “검증용”이 아니라:

```text
원본 확인
+ 누락 내용 복원
+ 블로그 내용 보강
+ 수식/표/그래프 복원
+ 원문의 구조와 표현 확인
```

이다.

---

## 2.1 현재 확인된 참고자료 구조

상위 폴더에는 다음 자료가 있다.

```text
hwp2html_test_results.zip

Goodwin 모형
그래프 변환 샘플
연속형 동적 최적화이론 응용
동적 최대화이론과 응용
차분방정식과 응용
미분방정식과 응용
```

각 `_test_review*` 폴더에는 일반적으로 다음 조합이 들어 있다.

```text
원본 HML
변환 HTML
conversion-report.json
media/
```

일부는 테스트용 그래프 파일 등으로 구성되어 있다.

---


### 참고자료 폴더명과 고정 ID

```text
Goodwin 모형
  1-qhjU98LMRIMoGVtGJk6GHc4UzJl5FE8

그래프 변환 샘플
  1x-RxGWiQe3Tmt-sWL8f3jSvWBvS20UH5

연속형 동적 최적화이론 응용
  1fWO67tuPJY0PfA_rtkJIWbzZGtpWrKv5

동적 최대화이론과 응용
  1rgMq2-qHYKWS1KxsFYgWLT_EsYGDW0py

차분방정식과 응용
  1bjFmrO2JbS5Ixtci6CCDv2qps-CmZ2Gd

미분방정식과 응용
  1_wLVYqpywqfBd7RGomUa9T75AaEKqcAP
```

폴더명보다 **Drive folder ID를 최종 식별자**로 본다.


## 2.2 현재 확인된 주요 참고자료 매핑

### `Goodwin 모형`

내용:

```text
Goodwin 모형.hml
Goodwin 모형.html
conversion-report.json
media/
```

활용 대상:

```text
goodwin model.html
Goodwin model2.html
phase diagram.html
differential-equation-applications.html
```

Goodwin 관련 블로그를 수정할 때는 기존 블로그 파일만 읽지 말고
이 변환본의 본문·수식·그래프·이미지·각주를 함께 확인한다.

---

### `그래프 변환 샘플`

내용:

```text
graph1.hml
graph1.html
conversion-report.json
media/
```

활용:

그래프/HWP 변환 결과를 확인해야 하는 작업에서 참고한다.
특히 그래프가 원본 HTML에서 어떻게 SVG 또는 이미지로 변환되었는지 비교할 때 유용하다.

---

### `연속형 동적 최적화이론 응용`

내용:

```text
연속형 동적 최적화이론 응용.hml
연속형 동적 최적화이론 응용.html
conversion-report.json
media/
```

변환 HTML 크기:

```text
약 98KB
```

활용 대상:

```text
dynamic-optimization-applications-continuous.html
optimal-control.html
calculus-of-variations.html
```

특히 연속형 동적최적화 응용 페이지를 수정할 때
`동적 최대화이론과 응용.html` 전체본뿐 아니라
이 별도 응용 자료도 반드시 비교한다.

---

### `동적 최대화이론과 응용`

내용:

```text
동적 최대화이론과 응용.hml
동적 최대화이론과 응용.html
conversion-report.json
media/
```

변환 HTML 크기:

```text
약 578KB
```

활용 대상:

```text
dynamic optimization.html
dynamic-optimization-discrete.html
dynamic-programming.html
calculus-of-variations.html
optimal-control.html
dynamic-optimization-applications-discrete.html
dynamic-optimization-applications-continuous.html
```

이 자료는 동적최적화 파트의 **정본(source of truth)**으로 사용한다.

---

### `차분방정식과 응용`

내용:

```text
차분방정식과 응용.hml
차분방정식과 응용.html
conversion-report.json
media/
```

변환 HTML 크기:

```text
약 582KB
```

활용 대상:

```text
difference-equation.html
difference-equation-basic.html
difference-equation-system.html
difference-equation-phase.html
difference-equation-stochastic.html
difference-equation-applications1.html
difference-equation-applications2.html
```

차분방정식 파트를 수정하거나 추가 보강할 때 반드시 이 원본 변환본과 대조한다.

---

### `미분방정식과 응용`

내용:

```text
미분방정식과 응용.hml
미분방정식과 응용.html
conversion-report.json
media/
```

변환 HTML 크기:

```text
약 470KB
```

활용 대상:

```text
system-of-differential equation.html
differential-equation-basics.html
differential-equation-second-order.html
differential-equation-systems.html
phase diagram.html
differential-equation-applications.html
```

미분방정식 파트의 **정본(source of truth)**이다.

---

## 2.3 참고자료 활용 우선순위

블로그 페이지와 참고자료가 동시에 존재하면 다음 순서로 판단한다.

```text
1. 사용자가 직접 작성한 기존 blog 구조와 페이지 역할
2. 기본 참고자료 저장소의 원본/HML/변환 HTML
3. conversion-report와 media 자산
4. 기존 blog의 다른 관련 페이지
5. 모델의 일반 지식
6. 필요 시 외부 웹 자료
```

여기서 중요한 점:

- **1번은 구조·저자의 의도 보존 기준**
- **2~3번은 내용 보강과 복원의 기준**

이다.

즉 기존 blog에 내용이 적다고 해서 모델 지식으로 먼저 채우지 않는다.
**기본 참고자료에서 관련 내용을 먼저 찾아 추가한다.**

---

## 2.4 반드시 수행할 비교 작업

대상 블로그 파일을 수정하기 전에 가능하면 다음 표를 머릿속 또는 작업 메모로 만든다.

```text
항목                    blog          참고자료
------------------------------------------------
본문                    있음/없음      있음/없음
수식                    있음/없음      있음/없음
표                      있음/없음      있음/없음
그래프/SVG              있음/없음      있음/없음
PNG/JPG/BMP             있음/없음      있음/없음
각주                    있음/없음      있음/없음
응용 사례               있음/없음      있음/없음
관련 절                  있음/없음      있음/없음
```

참고자료에만 존재하는 중요한 내용은
**누락분으로 간주하여 blog에 추가하는 것을 기본 방향으로 한다.**

---

## 2.5 “기존 블로그 수정”에서도 이 자료를 사용

이 규칙은 경제수학 II에만 적용되는 것이 아니다.

앞으로 전체 블로그를 수정할 때:

```text
game theory
인문수학
경제수학
경제물리
동학
Goodwin
phase diagram
기타 관련 페이지
```

등 어떤 주제든 먼저 기본 참고자료 폴더에 대응되는 자료가 있는지 찾는다.

현재 폴더에 없는 주제라면 기존 blog 자료를 기준으로 작업하되,
**“참고자료 폴더에 대응 원본이 없는지 확인했다”**는 단계 자체는 생략하지 않는다.

---

## 2.6 conversion-report.json의 역할

각 변환 폴더의 `conversion-report.json`은 단순 부속 파일이 아니다.

가능하면 다음을 확인한다.

```text
equations
footnotes
embedded_images
editable_svg
editable_gtree
tables 또는 기타 변환 요소
```

이 수치를 이용하여 분할/보강 후 자산이 손실되지 않았는지 검증한다.

예:

```text
원본 보고서
수식 3042
각주 180
이미지 4
SVG 7

분할 후 전체
→ 이미지 4 유지?
→ SVG 7 유지?
→ 각주가 필요한 장에 분배?
```

이처럼 **변환 보고서의 수치를 QA 기준으로 사용한다.**

---

## 2.7 media 폴더의 역할

각 참고자료의 `media/`는 반드시 함께 본다.

HTML에서:

```html
<img src="media/foo.png">
```

가 나오면 원본 media 폴더에서 실제 파일을 찾는다.

블로그에서 사용할 때는 필요 자산을:

```text
github/blog/media
```

로 복사하고 상대경로를 맞춘다.

이미지가 HTML에 inline SVG로 들어 있어도,
원본 media에 편집 가능한 SVG가 따로 있다면
보존 목적상 `blog/media`에 함께 둘 수 있다.

---

## 2.8 참고자료에서 내용을 추가할 때의 원칙

참고자료의 내용을 blog에 보강할 때는:

### 그대로 보존할 요소

- 수식
- 표
- 그래프
- 이미지
- 각주
- 원문 설명
- 개념의 전개 순서

### 필요 시 정리 가능한 요소

- 중복 heading
- 깨진 anchor
- 반복 footnote block
- SVG ID 충돌
- 모바일 폭
- 명백한 HTML 변환 잔재

### 임의로 하지 말 것

- 내용 요약
- 학술적 설명 삭제
- 수식 단순화
- 표를 prose로 대체
- 원문의 예시 삭제
- 참고자료의 내용을 모델 지식으로 다시 써서 대체

---

## 2.9 다음 세션의 필수 시작 절차

새 세션에서 블로그 작업을 이어갈 때:

```text
1. 이 통합 지침서를 읽는다.
2. Google Drive github/blog 현재 상태를 확인한다.
3. 기본 참고자료 저장소
   1KoCAO-N8yCpwQ9X-17I_u9pSUhMZdorm
   를 확인한다.
4. 대상 주제와 대응되는 기본 참고자료 폴더를 찾는다.
5. blog 파일과 참고자료를 대조한다.
6. 참고자료에만 있는 유의미한 내용을 blog에 추가한다.
7. 수식/표/그래프/이미지/각주를 보존한다.
8. 링크/anchor/media/SVG ID를 QA한다.
9. 기존 Drive file ID를 유지하여 반영한다.
```

**3~6번을 생략하고 현재 blog HTML만 보고 수정하지 않는다.**

---


# 3. Google Drive 작업 위치

## 핵심 폴더

### `github`

folder ID:

```text
1ekS2B1K6zsTk35WzMGPWwfVNhQw8ui5h
```

### `github/blog`

folder ID:

```text
1Th5zwczWm8F17-P8tMU88rKlIAP9saCI
```

### `github/blog/media`

folder ID:

```text
1JHn2xmEGkvDoPBPwyTwRNJOFsY1GUibs
```

---

# 3. GitHub과 Google Drive를 혼동하지 말 것

사용자는 명확히 다음 워크플로를 원한다.

```text
Google Drive
  └─ github
      └─ blog
```

이 폴더를 작업본으로 사용한다.

따라서 사용자가:

```text
덮어써
수정해
go
계속
```

라고 하면 기본 해석은:

> **Google Drive의 `github/blog` 파일을 수정하라**

이다.

다음은 하지 않는다.

- 사용자가 요청하지 않았는데 웹 GitHub에 push
- GitHub repository에 commit/push했다고 착각
- Drive 작업을 GitHub 작업으로 설명

웹 GitHub push는 **명시적 요청이 있을 때만** 한다.

---

# 4. 기존 파일을 수정할 때의 원칙

기존 파일은 가능하면 **Drive file ID를 유지**한다.

즉 새 파일을 만들어 같은 이름으로 교체하는 것보다:

```text
기존 file ID 확인
→ raw fetch
→ 수정
→ Google_Drive.update_file
```

을 사용한다.

장점:

- 기존 URL 유지
- 다른 HTML의 링크 유지
- Drive revision history 유지
- 파일 교체로 인한 링크 단절 방지

---

# 5. 이전 “블로그 수정” 세션의 기본 작업 방식

이전 작업은 경제수학 II만이 아니라 블로그 전체, 특히 **게임이론/인문수학 계열의 오래된 HTML**을 정비하는 작업이었다.

핵심 원칙은 다음과 같았다.

## 5.1 기존 글을 새 글로 바꾸지 않는다

기존 HTML에서:

- 개념 오류
- 명백한 오탈자
- 잘못된 수식
- 깨진 링크
- 미완성 문장
- 비어 있는 페이지
- 스타일 문제

를 고친다.

그러나 기존 저술의 성격 자체를 지워버리지 않는다.

---

## 5.2 기존 내용이 있는 페이지

기존 페이지가 충분한 내용을 가지고 있다면:

```text
기존 본문
+ 오류 수정
+ 필요한 설명 보강
+ 링크 복원
+ 수식 정리
+ 모바일/스타일 개선
```

방식을 사용한다.

---

## 5.3 내용이 지나치게 빈약하거나 미완성인 페이지

이전 세션에서는 **미완성 페이지를 보강**했다.

단, 이것도 기존 파일의 제목·역할을 유지한다.

즉:

```text
미완성 파일
→ 새 이름의 별도 페이지 생성
```

보다:

```text
미완성 파일
→ 기존 파일을 완성도 있게 보강
```

이 기본이다.

---

# 6. 이전 세션에서 다룬 게임이론 계열

현재 `blog`에 존재하는 주요 게임이론 관련 파일 예:

```text
game.html
nash.html
nash2.html
ne.html
bayesian.html
mixed-str.html
normal vs tree.html
forward-ind.html
pe.html
subgame.html
repeated-game.html
signaling.html
cheap-talk.html
nash-bargaining.html
cooperative-game.html
war-of-attrition.html
mechanism-design.html
evolu-game.html
```

또한:

```text
game-tree1.jpg
game-tree2.jpg
pe-tree.jpg
pe-tree2.jpg
pe-tree3.jpg
pe-tree-tab.jpg
pe-tab.jpg
pe-tab2.jpg
```

같은 관련 이미지도 존재한다.

---

## 6.1 게임이론 페이지 수정 원칙

### 개념

- Nash equilibrium
- mixed strategy
- Bayesian game
- perfect equilibrium
- subgame perfect equilibrium
- repeated game
- signaling
- bargaining
- cooperative game
- evolutionary game
- mechanism design

등 기존 페이지의 개념 정의를 점검한다.

### 수식

기존 수식이 있으면:

- 기호 일관성
- 괄호 누락
- 첨자/위첨자
- 기대효용 표기
- 확률 표기
- payoff matrix

등을 고친다.

### 표

게임표가 이미지 또는 HTML table로 있을 수 있다.

표 자체를 삭제하고 텍스트로 요약하지 않는다.

---

## 6.2 게임이론 세션에서의 중요한 판단 기준

게임이론 페이지들은 서로 연결성이 높다.

예:

```text
game.html
  ↓
ne.html / nash.html
  ↓
mixed-str.html
  ↓
bayesian.html
  ↓
pe.html
  ↓
subgame.html
  ↓
repeated-game.html
  ↓
signaling.html
```

따라서 관련 페이지 간 링크를 보강하는 것이 중요하다.

---

# 7. `index.html` / 상위 목차 수정 원칙

상위 목차는 **기존 분류를 바꾸지 않고** 다음 문제만 수정한다.

- 존재하지 않는 링크
- 새로 보강된 페이지 링크 누락
- 파일명과 href 불일치
- 대소문자 차이
- 공백 포함 파일명 오류
- 메뉴에서 접근할 수 없는 고립 페이지

상위 목차를 완전히 새 디자인으로 바꾸지 않는다.

---

# 8. `hum-math.html` / 인문수학 관련 원칙

이전 세션의 중요한 사용자 제약:

> `인문수학` 하위항목은 임의 변경 금지.

따라서 `hum-math.html`을 수정할 때는:

- 기존 항목명 유지
- 기존 순서 가급적 유지
- 깨진 링크 수정
- 누락된 링크 보완
- 명백한 오류 수정

정도만 한다.

“더 논리적인 분류”를 이유로 카테고리를 재배치하면 안 된다.

---

# 9. 블로그 전체에서 공통으로 확인해야 하는 파일 유형

`blog`에는 단순 HTML만 있는 것이 아니다.

## HTML

```text
*.html
```

## CSS

예:

```text
blog.css
eco-math.css
eco-math2.css
footnote.css
shell.css
cobweb.css
code.css
pdj.css
```

## JavaScript

예:

```text
dropdown.js
phase_diagram.js
cobweb.js
latex.js
LatexTable.js
params.js
data.js
code.js
```

## 이미지

```text
*.png
*.jpg
*.bmp
*.svg
```

수정 시 HTML만 보지 말고 연결된 CSS / JS / 이미지도 확인해야 한다.

---

# 10. 오래된 HTML 블로그의 특성

이 블로그에는 여러 시기에 만들어진 HTML이 섞여 있다.

따라서 페이지마다 다음이 다를 수 있다.

- HTML4 스타일
- inline style
- 별도 CSS
- JavaScript 기반 수식
- 이미지 기반 수식
- KaTeX
- 직접 만든 JS
- BMP 이미지
- 공백이 포함된 파일명
- 대소문자가 섞인 파일명

**현대 표준으로 일괄 변환하지 않는다.**

기존 페이지가 정상 작동하면 그 구조를 존중한다.

---

# 11. 수식 수정 원칙

수식은 가장 보수적으로 다룬다.

## 11.1 수식이 이미지로 존재하는 경우

임의로 LaTeX로 전환하지 않는다.

이미지 자체가 원본 학습자료의 일부일 수 있다.

---

## 11.2 LaTeX/KaTeX 수식

수식이 텍스트/KaTeX로 존재하면:

- delimiter 오류
- `\left`, `\right`
- 첨자
- 행렬
- 기대값
- 편미분
- 적분
- 동태식

등의 문법 문제를 수정할 수 있다.

---

## 11.3 경제수학 대용량 변환본

이 경우에는 변환된 HTML 수식 요소를 그대로 보존한다.

모델 기억으로 다시 LaTeX를 쓰지 않는다.

---

# 12. 링크 수정 스킬

링크 문제는 블로그 전체에서 매우 중요하다.

## 12.1 검사 대상

```html
<a href="">
<img src="">
<script src="">
<link href="">
```

---

## 12.2 파일명 공백

예:

```text
phase diagram.html
dynamic optimization.html
predator-prey model.html
goodwin model.html
normal vs tree.html
love equation.html
```

이런 파일명은 실제 이름과 정확히 일치해야 한다.

---

## 12.3 대소문자

예:

```text
Goodwin model2.html
goodwin model.html
```

GitHub/web hosting에서는 대소문자가 문제가 될 수 있다.

Drive에서 존재한다고 해서 배포 환경에서도 동일하다고 가정하지 않는다.

---

## 12.4 상대경로

루트 파일:

```html
<a href="foo.html">
```

media:

```html
<img src="media/foo.png">
```

---

# 13. 내부 anchor 수정

각주나 목차가 있는 HTML은 다음을 검사한다.

```text
href="#section"
id="section"
```

모든 내부 링크 대상이 실제 존재해야 한다.

Python 검사 개념:

```python
ids = {el.get("id") for el in soup.find_all(id=True)}

for a in soup.find_all("a", href=True):
    href = a["href"]

    if href.startswith("#"):
        if href[1:] not in ids:
            broken.append(href)
```

최종 목표:

```text
broken internal anchor = 0
```

---

# 14. 각주 처리

각주 구조:

```text
본문:
<a href="#fn12" id="fnref12">[12]</a>

각주:
<li id="fn12">
...
<a href="#fnref12">↩</a>
</li>
```

두 방향 모두 있어야 한다.

---

# 15. 대용량 학술 HTML을 다룰 때의 별도 스킬

경제수학 파트 작업에서 확립된 방식이다.

큰 HWP/HML 변환 HTML을 **요약본으로 바꾸지 않는다.**

예:

```text
미분방정식과 응용.html
약 470KB

동적 최대화이론과 응용.html
약 578KB
```

이런 자료는:

```text
원본 변환 HTML
↓
heading 구조 분석
↓
장별 DOM 분리
↓
수식 / 표 / SVG / PNG / 각주 보존
↓
세부 HTML 생성
```

방식으로 처리한다.

---

# 16. 경제수학 II 현재 구조

```text
eco-math2.html
│
├─ 미분방정식
│
├─ 위상도
│
├─ 차분방정식
│
└─ 동적최적화
```

---

# 17. 미분방정식 구조

```text
system-of-differential equation.html
│
├─ differential-equation-basics.html
├─ differential-equation-second-order.html
├─ differential-equation-systems.html
├─ phase diagram.html
└─ differential-equation-applications.html
```

---

# 18. 차분방정식 구조

```text
difference-equation.html
│
├─ difference-equation-basic.html
├─ difference-equation-system.html
├─ difference-equation-phase.html
├─ difference-equation-stochastic.html
├─ difference-equation-applications1.html
└─ difference-equation-applications2.html
```

---

# 19. 동적최적화 구조

```text
dynamic optimization.html
│
├─ dynamic-optimization-discrete.html
├─ dynamic-programming.html
├─ calculus-of-variations.html
├─ optimal-control.html
├─ dynamic-optimization-applications-discrete.html
└─ dynamic-optimization-applications-continuous.html
```

---

# 20. DOM 기반 분할

대용량 HTML은 텍스트를 복사해서 새로 쓰지 않는다.

BeautifulSoup으로 heading 위치를 찾는다.

예:

```python
children = [
    x for x in soup.body.children
    if getattr(x, "name", None)
]
```

heading index:

```python
start = find_heading("미분방정식 응용")
end = ...
```

그 범위를 그대로 사용한다.

이 방식의 장점:

- 수식 유지
- 표 유지
- inline SVG 유지
- 이미지 순서 유지
- 원문의 문단 구조 유지

---

# 21. SVG ID 충돌 처리

HWP 변환 SVG는 흔히 다음 ID를 반복한다.

```text
arrow
sgv-text
min1
```

HTML 하나에 SVG가 여러 개 있을 때 DOM ID 충돌이 생긴다.

해결:

```text
arrow
→ svg1-arrow

arrow
→ svg2-arrow
```

참조도 같이 바꾼다.

```text
url(#arrow)
→ url(#svg1-arrow)
```

반드시 함께 바꿀 것:

- `id`
- `url(#id)`
- `href="#id"`
- SVG 내부 style reference

---

# 22. 이미지/media 자산 관리

대용량 변환 자료의 이미지는 `blog/media`로 복사한다.

예:

## 미분방정식

```text
미분방정식과_응용_001.png
...
미분방정식과_응용_029.png
```

SVG:

```text
미분방정식과_응용_graph_001.svg
...
미분방정식과_응용_graph_015.svg
```

## 차분방정식

```text
차분방정식과_응용_001.png
...
차분방정식과_응용_020.png
```

SVG:

```text
차분방정식과_응용_graph_001.svg
...
차분방정식과_응용_graph_040.svg
```

## 동적최적화

```text
동적_최대화이론과_응용_001.png
...
동적_최대화이론과_응용_004.png
```

SVG:

```text
동적_최대화이론과_응용_graph_001.svg
...
동적_최대화이론과_응용_graph_007.svg
```

---

# 23. 모바일/반응형 보강

오래된 HTML은 PC 화면 기준으로 작성된 경우가 많다.

따라서 내용은 유지하면서 CSS만 보강한다.

권장 기본 스타일:

```css
body {
  max-width: 980px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
  line-height: 1.72;
  overflow-wrap: break-word;
}

table {
  display: block;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
}

img, svg {
  max-width: 100% !important;
  height: auto !important;
}

.katex-display,
.math-display,
div.math,
p.math {
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}
```

---

# 24. 이미지 접근성

alt가 없는 이미지는 자동으로 과도하게 해석하지 않는다.

예:

```text
Solow 성장모형 관련 도해
위상도 관련 도해
Bellman equation 관련 도해
```

처럼 가장 가까운 heading 기반으로 작성한다.

---

# 25. 표 접근성

기존 table 구조를 유지하면서:

```html
<table aria-label="Solow 성장모형 관련 표">
```

등을 추가할 수 있다.

원본 표 내용을 재작성하지 않는다.

---

# 26. 관련 문서 연결

새로운 설명을 본문 중간에 과도하게 넣기보다:

```html
<section class="related-documents">
  <h2>관련 문서</h2>
  ...
</section>
```

방식이 안전하다.

예:

```text
미분방정식 응용
↔ Predator–Prey
↔ Goodwin
↔ 차분방정식 응용

위상도
↔ 연립미분방정식
↔ 차분방정식 위상
↔ 동적최적화
```

게임이론도 동일:

```text
Nash
↔ mixed strategy
↔ Bayesian
↔ perfect equilibrium
↔ subgame
↔ repeated game
```

---

# 27. 관련 문서 자동 링크 작업의 원칙

블로그/문서 내부 링크를 자동 보강할 때는 다음 원칙을 따른다.

- 문서명/alias 사전을 먼저 만든다
- 같은 대상은 한 문서에서 첫 등장 중심
- 기존 링크를 건드리지 않는다
- URL 안의 텍스트를 다시 링크하지 않는다
- 이미지 링크를 건드리지 않는다
- 코드 블록 안을 건드리지 않는다
- 표 안에서 기계적으로 남발하지 않는다
- 일반적인 단어에 과도하게 링크하지 않는다
- 본문 삽입이 어색하면 `관련 문서` 섹션 사용

이 원칙은 사용자의 Vault 링크 작업 철학과도 일관된다.

---

# 28. 새 파일 생성 기준

이전 “블로그 수정” 세션에서는 새 문서 생성은 보수적으로 했다.

기본:

```text
기존 파일이 있으면 기존 파일 보강
```

새 파일은 다음과 같은 경우만 적절하다.

- 원본 대용량 자료를 장별로 분할해야 할 때
- 명백히 별도 주제로 독립 페이지가 필요한데 기존 파일이 없을 때
- 사용자가 명시적으로 요청한 경우

---

# 29. 절대 삭제하지 말아야 할 것

특별한 요청이 없는 한:

- 오래된 이미지
- BMP
- 수식용 JS
- CSS
- 기존 관련 페이지
- 사용자가 직접 작성한 설명
- 각주
- 표
- 오래된 표현

을 “낡았다”는 이유로 삭제하지 않는다.

---

# 30. 오래된 이미지 포맷

현재 blog에는 BMP 파일도 많다.

예:

```text
phase-diagram2.bmp
phase-diagram3.bmp
phase-diagram4.bmp

p-p model.bmp
p-p model2.bmp
p-p model3.bmp

donbush.bmp
donbush-phase-diag.bmp
...
```

BMP가 낡았더라도 현재 페이지가 참조하면 유지한다.

PNG 전환은 별도 요청이 있을 때 수행한다.

---

# 31. 기존 JS 의존성 주의

예:

```text
latex.js
LatexTable.js
phase_diagram.js
cobweb.js
params.js
data.js
dropdown.js
```

HTML이 이 파일들을 참조하면 삭제하거나 inline 코드로 대체하지 않는다.

먼저 실제 사용 여부를 확인한다.

---

# 32. 작업 전 검사

파일을 수정하기 전에 최소한 다음을 확인한다.

```text
파일명
Drive file ID
크기
현재 href
현재 src
연결 CSS
연결 JS
이미지
수식 방식
각주
```

---

# 33. 수정 후 QA

## 33.1 내용

- [ ] 기존 본문이 사라지지 않았는가
- [ ] 새 보강 내용이 원문과 충돌하지 않는가
- [ ] 수식이 손실되지 않았는가
- [ ] 표가 손실되지 않았는가
- [ ] 이미지가 손실되지 않았는가

## 33.2 링크

- [ ] `href` 대상 존재
- [ ] `src` 대상 존재
- [ ] CSS 존재
- [ ] JS 존재
- [ ] media 파일 존재

## 33.3 anchor

- [ ] duplicate ID 없음
- [ ] `#fnN` 존재
- [ ] `#fnrefN` 존재
- [ ] 목차 anchor 존재

## 33.4 레이아웃

- [ ] 모바일에서 표 overflow 가능
- [ ] 수식 overflow 가능
- [ ] 이미지 폭 100% 이하
- [ ] SVG 폭 100% 이하

---

# 34. cross-file 링크 전수검사

경제수학 정비 중 약 269개의 로컬 참조를 전수 점검한 방식이 유용하다.

검사:

```text
a[href]
img[src]
script[src]
link[href]
```

제외:

```text
http://
https://
mailto:
data:
javascript:
```

로컬 파일은 실제 Drive `blog` 목록과 대조한다.

---

# 35. Drive에서 파일 존재를 확인하는 방법

블로그 폴더 전체를 list하여:

```text
title
id
mime_type
size
```

목록을 만든다.

media 폴더도 별도 list한다.

그 뒤 HTML reference와 대조한다.

---

# 36. 사용자에게 작업 결과를 보고할 때

다음처럼 보고한다.

좋은 예:

```text
게임이론 묶음 8개 파일 수정
- 기존 구조 유지
- 깨진 링크 12개 수정
- 수식 4곳 교정
- 미완성 2페이지 보강
- Drive 기존 file ID 유지
```

피할 것:

```text
완벽하게 전면 개편했습니다.
```

실제로 모든 파일을 검사하지 않았다면 그렇게 말하지 않는다.

---

# 37. 추정과 확인을 구분한다

파일 작업에서 특히 중요하다.

다음은 분리해서 말한다.

```text
확인:
Drive에 goodwin model.html 존재

추정:
이 페이지가 현재 위상도 파트의 관련 문서로 가장 적절해 보임
```

---

# 38. 원본과 보강 설명을 구분한다

대용량 학술 자료에서 AI 설명을 추가할 때:

```html
<section class="source-material">
  원본 변환 자료
</section>

<section class="additional-note">
  보충 설명
</section>
```

처럼 구분하는 것이 좋다.

사용자가 직접 쓴 자료와 모델의 보강 내용을 섞어버리지 않는다.

---

# 39. 기존 표현을 지나치게 현대화하지 않는다

예를 들어 오래된 글에서:

```text
完全情報
定差方程式
位相圖
```

같은 표현이 있더라도 그것이 사용자 원문의 일부라면 무조건 현대어로 치환하지 않는다.

필요하면 영어/현대 용어를 병기한다.

---

# 40. 분할 기준

긴 페이지를 분할할 때는 내용 길이보다 **개념 단위**가 중요하다.

좋은 분할:

```text
Difference Equation
- Basic
- System
- Phase
- Stochastic
- Applications
```

나쁜 분할:

```text
part1
part2
part3
part4
```

---

# 41. 언제 분할하지 말아야 하는가

파일이 길다는 이유만으로 쪼개지 않는다.

다음 조건을 본다.

- 명확한 대단원이 있는가
- 각 장이 독립적 의미를 갖는가
- 기존 목차에서 연결하기 쉬운가
- 원문 각주를 안전하게 분리할 수 있는가

---

# 42. 현재 블로그 전체 작업에서의 두 가지 수정 모드

## Mode A — 기존 소형/중형 HTML 정비

주로 이전 “블로그 수정” 세션.

```text
fetch
→ 읽기
→ 오류/미완성/링크/스타일 수정
→ 검수
→ same file ID update
```

대상 예:

```text
game.html
nash.html
bayesian.html
pe.html
subgame.html
signaling.html
hum-math.html
index.html
```

---

## Mode B — 대용량 변환 HTML 구조화

주로 경제수학 II.

```text
변환본 정본 fetch
→ DOM 구조 분석
→ 장 분할
→ media 복사
→ 각주 분배
→ SVG ID 정리
→ 모바일 CSS
→ 링크 검수
→ Drive 반영
```

---

# 43. 작업을 이어갈 때 가장 먼저 해야 할 일

새 세션에서 사용자가:

```text
계속 해
go
이어가자
```

라고 하면:

1. 이 문서를 읽는다.
2. `github/blog` 현재 목록을 확인한다.
3. 마지막 수정 시점 파일을 확인한다.
4. 이전에 작업한 범위를 추정으로 답하지 말고 Drive 상태를 읽는다.
5. 대상 카테고리 파일을 묶어서 처리한다.

---

# 44. 사용자가 지적했던 대표적 실수

## 실수 1 — GitHub push로 오해

잘못된 해석:

```text
github/blog
→ web GitHub repository
```

실제:

```text
Google Drive의 github/blog 폴더
```

---

## 실수 2 — 원본을 너무 요약

대용량 미분방정식 자료를 작은 요약 페이지로 만든 것은 품질이 낮았다.

교훈:

> 원본이 크면 내용도 큰 이유가 있다. 먼저 보존한 뒤 구조화한다.

---

## 실수 3 — 각주 전체 복제

분할 장마다 전체 각주를 붙이면:

- 파일 커짐
- duplicate ID
- 잘못된 reverse link

발생.

해결:

```text
장별 실제 참조 각주만 유지
```

---

## 실수 4 — SVG ID 중복

여러 SVG를 합치면서:

```text
id="arrow"
```

가 반복.

해결:

```text
svg1-arrow
svg2-arrow
```

namespace.

---

## 실수 5 — 분류를 너무 적극적으로 재구성

사용자는 기존 구조를 유지하는 쪽을 선호한다.

따라서 새 분류체계를 제안할 수는 있지만,
사용자 승인 없이 적용하지 않는다.

---

# 45. 블로그 전체에서의 작업 철학 요약

이 프로젝트에서 ChatGPT의 역할은:

```text
새 블로그 저자
```

가 아니라

```text
기존 블로그의 보존형 편집자
+ 오류 교정자
+ HTML 복원자
+ 구조 정리자
+ 링크 관리자
```

에 가깝다.

---

# 46. 권장 작업 순서 — 전체 블로그

## 1단계: 카테고리 선택

예:

```text
게임이론
인문수학
경제수학
경제물리
프로그램/코드
```

## 2단계: 파일 목록 확인

Drive `blog`에서 실제 파일 확인.

## 3단계: 관련 자산 확인

CSS / JS / image.

## 4단계: 내용 검토

오류 / 미완성 / 깨진 링크.

## 5단계: 보수적 수정

기존 내용 유지.

## 6단계: QA

anchor / href / src / 수식 / 표.

## 7단계: Drive 반영

same file ID update.

## 8단계: 다음 카테고리

---

# 47. 다음 작업자가 반드시 기억할 문장

> **기존 블로그의 역사와 구조 자체가 데이터다. 정리한다는 이유로 그것을 지우지 말 것.**

> **Drive `github/blog`가 작업본이며, 사용자가 명시하지 않은 GitHub push는 하지 말 것.**

> **기존 파일이 있으면 새 파일로 교체하지 말고 file ID를 유지하여 덮어쓸 것.**

> **대용량 학술 HTML은 요약하지 말고 원문 DOM을 보존하여 분할할 것.**

> **수식·표·그래프·각주·이미지를 본문과 동등한 중요도로 다룰 것.**

> **카테고리를 임의로 재편하지 말 것. 특히 `인문수학` 기존 하위항목은 유지할 것.**

---

# 48. 최종 체크리스트

다음 작업을 시작하기 전에:

- [ ] 이 가이드를 읽었는가
- [ ] Drive `github/blog` 목록을 확인했는가

- [ ] 기본 참고자료 저장소 `1KoCAO-N8yCpwQ9X-17I_u9pSUhMZdorm`를 먼저 확인했는가
- [ ] 대응되는 HML/변환 HTML/conversion-report/media를 확인했는가
- [ ] 참고자료에만 있는 유의미한 본문·수식·표·그래프·이미지·각주를 blog에 추가했는가

- [ ] 대상 파일의 기존 ID를 확인했는가
- [ ] 기존 카테고리를 보존하는가
- [ ] 원문을 삭제하지 않는가
- [ ] 관련 CSS/JS/image를 확인했는가
- [ ] 수식을 보존하는가
- [ ] 각주를 보존하는가
- [ ] 링크를 검수했는가
- [ ] 수정 후 Drive에 즉시 반영했는가
- [ ] 실제 확인한 것만 완료했다고 보고하는가

---

# 49. 한 줄 요약

> **이 블로그 수정 프로젝트는 Google Drive `github/blog`의 기존 자료를 보존하면서, 카테고리 구조를 유지한 채 오류·미완성·링크·수식·표·이미지·각주·스타일을 단계적으로 복원·보강하고, 대용량 학술 HTML은 원본 DOM을 손실 없이 장별로 재구성하여 기존 Drive file ID에 직접 반영하는 작업이다.**
