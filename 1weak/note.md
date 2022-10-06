# 1주차

## 학습 방향 및 목적
- 키워드 중심으로 학습
- TS는 왜 쓰는지?, 어떻게 쓰는지, Type, InterFace는 각각 어떤 역할을 하는지?, Generic은 무엇인지?
- TS를 효과적으로 사용하는 방법은 무엇인지?

## 학습 내용 정리
- 런타임 : JS가 동작하는 과정
- Type 존재 X
- 값을 인자로 넘길 때, 타입이 아닌 값으로 넘어감
- 덕 타이핑
- 타입의 범위
- intersection
- 모두 다 필수 타입으로 생각 할게
- union : 공통된 타입을 필수 타입으로 생각
- never type과 void 타입 차이는?
- 공집합(never) → 리터럴(1개) → 유니온 타입
- `extends`는 `generic`에서 핵심

### 타입과 값 예시
```jsx
let a = 'foo' // let으로 선언했기 때문에 string type
const a = 'foo' // const로 선언했기 때문에 foo라는 문자열 리터럴 타입 

typeof a === 'string' // 타입 체크 방법
```

### extends 타입 확장 예시
```
T extends HTMLElement // T 타입은 HTMLElement을 포함
```


## TS에서 this 못쓰게 하는 이유
- 예측 하기 어려움
- tsconfig this 못쓰게 함


class, enum은 타입과 값이 2가지 있음 → enum 사용하지 마삼

```jsx
const body = document.body
body as string // 타입이 너무 달라서 에러 뜸
```

## 잉여 속성 체크 좋음

- 할당의 개념을 정확히 알아야 잉여 속성 체크와 일반적인 구조적 할당 가능성 체크
- 밑에 이해가 안되는뎅…………..

```jsx
interface Options {
	title: string,
	darkMode?: boolean
}

const o1: Options = document;  // OK 
```

```jsx
const sumg typeof sumgType = (a,b) => {...}
```

## 타입과 인터페이스 차이

- 타입과 인터페이스 확장은 가능
- 서로 완벽하게 호환 가능
- 타입이 취급되는 방식이 다름
- 인터페이스
    - 유니온 타입으로 확장 불가, 튜플 X
    - 인터페이스: 타입 보강과 선언 병합 (타입은 불가)

## 타입 인덱싱: keyof와 Partial 타입, ReturnType

## 아이템 15 인덱스 시그니처 활용하기 type ABC 고급타입 숙지

# ✅ 과제

---

## 과제 의도

1. 유연함 : 외부에서 타입을 조작하는 방법
    - 제네릭
    - 리터럴 분리해서 타입을 넣었을 경우
2. Array로 타입을 명시하지 않은 이유
    - 인자 또는 파라미터로 전달시 `readonly`시 읽지 못함
3. 객체를 변경 불가능하는 방법
    - `as const`
    - 외부 라이브러리 사용시 활용
4. 타입 별칭
5. 값과 타입이 공존하는 방법
6. 8번 - TS가 정상적으로 작동해도 JS 런타임이 제대로 작동되지 않다는 것을 알려주기 위한 의도
7. 10번 - 타입 가드

    ```jsx
    // x가 any
    // x에 Null, undeinfed도 포함
    typeof x === 'object'
    ```


## 🙇🏻‍♂️ 발표 자료