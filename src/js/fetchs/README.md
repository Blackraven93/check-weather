# 비동기 처리??

- 힙 메모리
- 스택 메모리
- 태스크 큐
  - 스택 메모리가 비어 있다면 이벤트 루프가 태스크 큐에서 스택으로 이동시켜 준다.
- 이벤트 루프

## XMLHttpRequest(Ajax) vs Fetch (vs Axios)

### ajax(Asynchronous javascript and xml)

- 내장 라이브러리
- [Can i use ajax..?](https://caniuse.com/?search=xml)

### fetch

- 내장 라이브러리
- [fetch MDN](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch)
- [Can i use fetch..?](https://caniuse.com/?search=fetch)

### Axios
- node, browser 모두 사용가능 (promise 객체로 전달)
- 라이브러리(크로스 브라우징 호환성 높음) 

## callback vs promise vs async/await (vs observables)

### Callback hell..?
```javascript
const printString = (string, callback) => {
    setTimeout(() => {
        console.log(string)
        callback()
    },
    Math.floor(Math.random() * 100) + 1
  )
}

const printAll = () => {
    printString("A", () => {
           printString("B", () => {
                  printString("C", () => {})
           })
    })
}

printAll()
// A => B => C
```

### Promise

- pending : 로직이 대기중인 상태
- Fulfilled : 비동기가 완료되어 실행 준비 상태
- Rejected : 비동기 처리 실패 || 오류 상태
- promise는 체이닝이 가능하여 비동기 처리를 우아하게 할 수 있다.

```javascript
function extract(){
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve('coffee bean extract') }, 1000) 
    })
}
function ready(){
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve('ready to manufacture americano') }, 1000) 
    })
}
function drink(){
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve('drink coffee') }, 1000) 
    })
}

extract()
.then(() => {
    return ready
})
.then(() => {
    return drink
})
```

### Async / Await

- promise + generator

```javascript
// async function extract() {}
const extract = async () => { ... }

const ready = async () => { ... }

const drink = async () => { ... }

let enjoyCoffee = async () => {
  console.log(await extract())
  console.log(await ready())
  console.log(await drink())
}

enjoyCoffee()
```