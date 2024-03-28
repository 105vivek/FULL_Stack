const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const { default: Employee } = require("./employeeModel");
const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  department: String,
  salary: Number,
});

const Employee = mongoose.model("Employee", employeeSchema);
// export default Employee;

const app = express();
const PORT = 5000;

mongoose.connect(
  "mongodb+srv://105vivek:vivek123@cluster0.fe7frup.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Create new employee
app.post("/api/employees", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});
// Read all employees
app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Update employee
app.put("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete employee
app.delete("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    res.send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});
