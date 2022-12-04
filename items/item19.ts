// <추론 가능한 타입을 사용해 장황한 코드 방지하기>
// - TS가 타입을 추론할 수 있따면, 타입 구문을 작성하지 않는게 좋습니다.
// - 이상적인 경우 함수/메서드의 시그니처에는 타입 구문이 있지만, 함수 내의 지역 변수에는 타입 구문이 없습니다.(비구조할당을 사용하면 지역변수 타입이 자동 추론됩니다.)
// - 추론될 수 있는 경우라도 객체 리터럴과 함수 반환에는 타입 명시를 고려해야 합니다. 이는 내부 구현의 오류가 사용자 코드 위치에 나타나는 것을 방지해 줍니다.

const cache: { [ticker: string]: number } = {};
function getQuote(ticker: string): Promise<number> | number {
  if (ticker in cache) {
    return cache[ticker];
  }
  return fetch(`https://quotes.example.com/?q=${ticker}`).then((response) =>
    response.json().then((quote) => {
      cache[ticker] = quote;
      return quote;
    })
  );
}
