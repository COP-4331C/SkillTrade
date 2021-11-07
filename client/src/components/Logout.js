
export function logoutUser() {
    try {
        localStorage.removeItem('token_data');
    }
    catch (e) {
        console.log(e.message);
    }

    // Send user to the landing page
    window.location.href = '/';
}
