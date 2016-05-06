var express = require('express');
var usersDb = require('./../model/users');
var router = express.Router();

// GET ALL
router.get('/', function(req, res) {
    usersDb.readAllStudents(
        function(results) {
            res.json(results);
        },

        function(error){
            if (error) {
                console.log(error);
                res.json(error);
            }
        }
    );
});

// GET ONE
router.get('/:email', function(req, res) {
    usersDb.readStudent(req.params.email,
        function(results) {
            res.json(results);
        },

        function(error){
            if (error) {
                console.log(error);
                res.json(error);
            }
        }
    );
});

// POST
router.post('/', function(req, res) {
    var student = new Student(req.body.name, req.body.email, req.body.program);
    usersDb.createStudent(student,
        function() {
            res.json({message: "Student created"})
        },

        function(error){
            if (error) {
                console.log(error);
                res.json(error);
            }
        }
    );
});

// PUT
router.put('/', function(req, res) {
    var student = new Student(req.body.name, req.body.email, req.body.program);
    usersDb.updateStudent(student,
        function(results) {
            res.json({message: "Student updated"})
        },

        function(error){
            if (error) {
                console.log(error);
                res.json(error);
            }
        }
    );
});

// DELETE
router.delete('/:email', function(req, res) {
    usersDb.deleteStudent(req.params.email,
        function(results) {
            res.json({message: "Student deleted"})
        },

        function(error){
            if (error) {
                console.log(error);
                res.json(error);
            }
        });
});

function Student(name, email, program) {
    this.name = name;
    this.email = email;
    this.program = program;
}

module.exports = router;