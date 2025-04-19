const toggleTheme = (e) => {
    document.querySelector('body').classList.toggle('dark')
    document.getElementById('theme-btn-circle').toggleAttribute('dark')
}

const debounce = (fn, delay=1000) => {
    let timer;

    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => fn(...args), delay)
    } 
}
