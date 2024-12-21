function redirectToLogin() {
    window.location.href = 'login.html';
}

document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem('authToken', result.token); 
            alert('Inloggen succesvol!');
            window.location.href = 'admin.html';
        } else {
            alert(`Fout: ${result.error || 'Onjuiste gegevens'}`);
        }
    } catch (error) {
        console.error('Fout bij het inloggen:', error);
        alert('Er ging iets mis bij het inloggen.');
    }
});

function logout() {
    localStorage.removeItem('authToken');
    alert('Je bent uitgelogd!');
    window.location.href = 'login.html';
}
