document.getElementById('employeeLoginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const employeeName = document.getElementById('employeeName').value;
    const employeeId = document.getElementById('employeeId').value;
    const companyCode = document.getElementById('companyCode').value;

    const response = await fetch('/api/employee/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ employeeName, employeeId, companyCode })
    });

    if (response.ok) {
        window.location.href = 'employee_dashboard.html';
    } else {
        alert('Invalid login credentials.');
    }
});


