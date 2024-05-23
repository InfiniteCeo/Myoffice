document.getElementById('employerSignupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const companyName = document.getElementById('companyName').value;

    const response = await fetch('/api/employer/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, companyName })
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById('uniqueCodeContainer').style.display = 'block';
        document.getElementById('uniqueCode').textContent = data.uniqueCode;
    } else {
        alert(`Error: ${data.message}`);
    }
});
