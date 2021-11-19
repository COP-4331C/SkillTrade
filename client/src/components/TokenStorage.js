

// Stores token as a string in the browser's local storage
export function storeToken(token) {
    try {
        localStorage.setItem('token_data',token);
    }
    catch (e) {
        console.log(e.message);
    }
}

// Retrieve the token from local storage.
export function retrieveToken() {
    let token;
    try {
        token = JSON.parse(localStorage.getItem('token_data'));
    }
    catch (e) {
        console.log(e.message);
    }
    return token;
}
