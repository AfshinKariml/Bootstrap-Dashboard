(() => {
    'use strict'
  
    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)
  
    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme()
        if (storedTheme) {
            return storedTheme
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  
    const setTheme = theme => {
        document.documentElement.setAttribute('data-bs-theme', theme)
    }

    const showActiveTheme = (theme) => {
        document.getElementById('lightModeBtn').classList.remove('active')
        document.getElementById('darkModeBtn').classList.remove('active')
        
        if (theme === 'light') {
            document.getElementById('lightModeBtn').classList.add('active')
        } else if (theme === 'dark') {
            document.getElementById('darkModeBtn').classList.add('active')
        }
    }
  
    const initialTheme = getPreferredTheme()
    setTheme(initialTheme)
  
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme()
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            const newTheme = getPreferredTheme()
            setTheme(newTheme)
            showActiveTheme(newTheme)
        }
    })
  
    window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(initialTheme)
        
        document.getElementById('lightModeBtn').addEventListener('click', () => {
            setStoredTheme('light')
            setTheme('light')
            showActiveTheme('light')
        })
        
        document.getElementById('darkModeBtn').addEventListener('click', () => {
            setStoredTheme('dark')
            setTheme('dark')
            showActiveTheme('dark')
        })
        const form = document.querySelector('.needs-validation')

        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })
})()