export function post(
  endpoint: string,
  data: { [key: string]: string | number }
) {
  const body = new FormData();
  for (const key in data) {
    body.append(key, "" + data[key]);
  }

  return fetch(endpoint, { method: "POST", body });
}
