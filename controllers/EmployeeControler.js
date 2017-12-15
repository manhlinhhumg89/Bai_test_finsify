var mongoose = require('mongoose');
var Employee = require('../models/Employee');

var employeeController = {};

// Show list of employees
employeeController.list = function(req, res) {
    Employee.find({}).exec(function(err,employees) { // phuowng thuc exec la thuc thi 1 cau lenh
        if(err) {
            console.log("Error",err)
        } else {
            res.render("../views/employees/index", { employees: employees})
         
        }
    })
}

//Show employee by Id
employeeController.show  = function(req, res) {
    Employee.findOne({_id: req.params.id}).exec(function(err, employee){
        if(err) {
            console.log("Error" , err)
        } else {
            res.render("../views/employees/show", {employee: employee})
           
        }
    })
}

// Create new Employee
employeeController.create = function(req, res) {
    res.render("../views/employees/create");
};

// Save new employee
employeeController.save = function(req, res ){
    var employee = new Employee(req.body);
    employee.save(function(err) {
        if(err) {
            console.log(err)
            res.render("../views/employees/create");
        } else {
            res.redirect("/employees/show/"+employee._id)
            
        }
    })
}

//Edit an employee
employeeController.edit = function(req,res) {
    Employee.findOne({_id: req.params.id}).exec(function(err,employee){
        if(err) {
            console.log("Error:",err)
        } else {
           res.render("../views/employees/edit",{employee: employee})
           
        }
    })
}

// Update an employee
employeeController.update = function(req,res) {
    Employee.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name, 
            address: req.body.address,
            position: req.body.position, 
            age: req.body.age, 
            id_card: req.body.id}}
    , function(err,employee){
        if(err) {
            console.log(err)
            res.render("../views/employees/edit",{employee: req.body})
        } 
        res.redirect("/employees/show/"+employee._id)
        
    }
    )
}

//Delete an employee

employeeController.delete = function(req,res) {
    Employee.remove({_id: req.params.id},function(err){
        if(err) {
            console.log(err)
        }
        else {
            console.log("Employee Deleted!");
            res.redirect("/employees")
        }
    })
}

module.exports = employeeController