var express = require('express');
var usersDb = require('./../model/users');
var router = express.Router();

// GET ALL
router.get('/', function(req, res) {
    usersDb.readAllUsers(
        function(results) {

            users = [];
            results.forEach(function(result) {
                users.push(new User(result.ds_profile, result.ds_email, result.id_program, result.id_campus, result.ds_bio));
            })

            res.json(users);
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
    usersDb.readUser(req.params.email,
        function(results) {

            if (results.length)
                res.json(new User(results[0].ds_profile, results[0].ds_email, results[0].id_program, results[0].id_campus, results[0].ds_bio));
            res.json({});
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
    var user = new User(req.body.name, req.body.email);
    usersDb.createUser(user, req.body.password,
        function() {
            res.json({message: "User created"})
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
    var user = new User(req.body.name, req.body.email, req.body.program, req.body.campus, req.body.bio);
    usersDb.updateUser(user,
        function(results) {
            res.json({message: "User updated"})
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
    usersDb.deleteUser(req.params.email,
        function(results) {
            res.json({message: "User deleted"})
        },

        function(error){
            if (error) {
                console.log(error);
                res.json(error);
            }
        });
});

function User(name, email, program, campus, bio) {
    this.name = name;
    this.email = email;
    this.program = program;
    this.campus = campus;
    this.bio = bio;
}

module.exports = router;