const crlf = document.querySelectorAll('.crlf');
const log = document.querySelector('.log');

for (let i = 0; i < crlf.length; i++){
    crlf[i].addEventListener('click', () => {
        const keys = Object.keys(sessionStorage)
        for (let j = 0; j < keys.length; j++){
            if (keys[j] != 'user') sessionStorage.removeItem(keys[j]);
        }
    })
}

log.addEventListener('click', () => {
    sessionStorage.clear()
    location.reload()
})