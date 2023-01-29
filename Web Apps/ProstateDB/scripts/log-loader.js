window.onload = () => {
    if (sessionStorage.getItem('user') === undefined || sessionStorage.getItem('user') === null) {
        location.href = '/login'
    }
}