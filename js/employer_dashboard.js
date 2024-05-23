document.getElementById('employeeDetailsForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const employeeName = document.getElementById('employeeName').value;
    const employeeId = document.getElementById('employeeId').value;
    const position = document.getElementById('position').value;

    const response = await fetch('/api/employer/addEmployee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ employeeName, employeeId, position })
    });

    if (response.ok) {
        const employee = await response.json();
        const employeeList = document.getElementById('employeeList');
        const li = document.createElement('li');
        li.textContent = `Name: ${employee.name}, ID: ${employee.id}, Position: ${employee.position}`;
        employeeList.appendChild(li);
    } else {
        alert('Error adding employee.');
    }
});


