

// Stores data as a string in the browser's local storage
export function storeData(key, value) {
  try {
    localStorage.setItem(key, value);
  }
  catch (e) {
    console.log(e.message);
  }
}

// Retrieve the data from local storage.
export function retrieveData(key) {
  let value;
  try {
    value = localStorage.getItem(key);
  }
  catch (e) {
    console.log(e.message);
  }
  return value;
}