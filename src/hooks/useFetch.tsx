export const useFetch = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return await data;
}