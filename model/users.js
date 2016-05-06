var db = require('./../db');

module.exports = {

    readAllStudents: function(resultCallback, errorCallback) {
        console.log('DB - readAllStudents');
        db.connection.query("SELECT * FROM student",
            function(err, result) {
                if (err)return errorCallback(err);
                return resultCallback(result);
            }
        );
    },

    readStudent: function(email, resultCallback, errorCalback) {
        console.log('DB - readStudent ' + email);
        db.connection.query("SELECT * FROM student WHERE ds_email = ?", [email],
            function(err, results) {
                if (err) return errorCalback(err);
                return resultCallback(results);
            }
        );
    },

    createStudent: function(student, successCallback, errorCallback) {
        console.log('DB - createStudent ' + JSON.stringify(student));
        db.connection.query("INSERT INTO student VALUES(?, ?, ?)",
            [student.email, student.name, student.program],
            function(err, results, fields) {
                if (err) return errorCallback(err);
                return successCallback();
            }
        );
    },

    updateStudent: function(student, successCallback, errorCallback) {
        console.log('DB - updateStudent ' + JSON.stringify(student));
        db.connection.query('UPDATE student SET ds_student = ?, program_id = ? WHERE ds_email = ? ',
            [student.name, student.program, student.email],
            function(err, results) {
                if (err) return errorCallback(err);
                return successCallback(results);
            }
        );
    },

    deleteStudent: function(email, successCallback, errorCallback) {
        console.log('DB - deleteStudent ' + email);
        db.connection.query("DELETE FROM student WHERE ds_email = ? ", [email],
            function(err, results) {
                if (err) return errorCallback(err);
                return successCallback(results);
            }
        );
    }
}