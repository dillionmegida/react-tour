export function getLocalStorage<T>(key: string) {
  const value = localStorage.getItem(key);
  return value ? (JSON.parse(value) as T) : null;
}

export function setLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function deleteLocalStorage(key: string) {
  localStorage.removeItem(key);
}
