export async function getList() {
  const data = await fetch("http://localhost:3333/list");
  return await data.json();
}