export async function getList() {
  const data = await fetch("http://localhost:3333/list");
  return await data.json();
}

export async function setItem (item) {
  const data = await fetch("http://localhost:3333/list", {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({ item })
  });
  return await data.json();
}