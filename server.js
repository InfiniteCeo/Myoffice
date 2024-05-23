const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// MongoDB connection
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const employerSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    companyName: String,
    uniqueCode: String
});

const employeeSchema = new mongoose.Schema({
    name: String,
    id: String,
    position: String,
    employerCode: String,
    loginTime: String,
    workProgress: String,
    internalMemo: String
});

const Employer = mongoose.model('Employer', employerSchema);
const Employee = mongoose.model('Employee', employeeSchema);

// Employer sign-up
app.post('/api/employer/signup', async (req, res) => {
    const { username, email, password, companyName } = req.body;
    const uniqueCode = uuidv4();
    const employer = new Employer({ username, email, password, companyName, uniqueCode });
    await employer.save();
    res.status(201).json({ uniqueCode });
});

// Employer login
app.post('/api/employer/login', async (req, res) => {
    const { username, password } = req.body;
    const employer = await Employer.findOne({ username, password });
    if (employer) {
        res.status(200).send();
    } else {
        res.status(401).send({ message: 'Invalid login credentials' });
    }
});

// Add employee
app.post('/api/employer/addEmployee', async (req, res) => {
    const { employeeName, employeeId, position, employerCode } = req.body;
    const employer = await Employer.findOne({ uniqueCode: employerCode });
    if (employer) {
        const employee = new Employee({ name: employeeName, id: employeeId, position, employerCode });
        await employee.save();
        res.status(201).json(employee);
    } else {
        res.status(401).send({ message: 'Employer not found' });
    }
});

// Employee login
app.post('/api/employee/login', async (req, res) => {
    const { employeeName, employeeId, companyCode } = req.body;
    const employee = await Employee.findOne({ name: employeeName, id: employeeId, employerCode: companyCode });
    if (employee) {
        res.status(200).send();
    } else {
        res.status(401).send({ message: 'Invalid login credentials' });
    }
});

// Fetch employee details
app.get('/api/employee/details', async (req, res) => {
    const employeeId = req.query.id; // Example: fetch by ID, adjust as necessary
    const employee = await Employee.findOne({ id: employeeId });
    if (employee) {
        res.status(200).json(employee);
    } else {
        res.status(404).send({ message: 'Employee not found' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
