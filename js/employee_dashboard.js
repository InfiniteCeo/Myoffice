// Fetch employee details and display them
(async () => {
    const response = await fetch('/api/employee/details');
    const employee = await response.json();

    document.getElementById('employeeName').textContent = employee.name;
    document.getElementById('employeeId').textContent = employee.id;
    document.getElementById('loginTime').textContent = employee.loginTime;
    document.getElementById('workProgress').textContent = employee.workProgress;
    document.getElementById('internalMemo').textContent = employee.internalMemo;
})();


