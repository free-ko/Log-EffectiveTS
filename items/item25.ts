// <비동기 코드에는 콜백 대신 async 함수 사용하기>
// - 콜백보다는 프로미스나 async/await를 사용해야 하는 이유
// - 1. 코드를 작성하기 쉽습니다.
// - 2. 타입을 추론하기 쉽습니다.
// - 3. async 함수는 항상 프로미슬 반환하도록 강제됩니다.

const cache: { [url: string]: string } = {};
const fetchWithCache = async (url: string) => {
  if (url in cache) {
    return cache[url];
  }

  const response = await fetch(url);
  const text = await response.text();
  cache[url] = text;
  return text;
};

let requestStatus: "loading" | "success" | "error";
// @ts-ignore
const getUser = async (userId: string) => {
  requestStatus = "loading";
  const profile = await fetchWithCache(`/user/${userId}`);
  requestStatus = "success";

  return profile;
};
