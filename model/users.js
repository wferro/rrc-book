var db = require('./../db');

module.exports = {

    readAllUsers: function(resultCallback, errorCallback) {
        console.log('DB - readAllUsers');
        db.connection.query("SELECT * FROM profile",
            function(err, result) {
                if (err)return errorCallback(err);
                return resultCallback(result);
            }
        );
    },

    readUser: function(email, resultCallback, errorCalback) {
        console.log('DB - readUser ' + email);
        db.connection.query("SELECT * FROM profile WHERE ds_email = ?", [email],
            function(err, results) {
                if (err) return errorCalback(err);
                return resultCallback(results);
            }
        );
    },

    createUser: function(user, password, successCallback, errorCallback) {
        console.log('DB - createUser ' + JSON.stringify(user));
        db.connection.query("INSERT INTO profile VALUES(?, ?, null, null, null, ?)",
            [user.email, user.name, password],
            function(err, results, fields) {
                if (err) return errorCallback(err);
                return successCallback();
            }
        );
    },

    updateUser: function(user, successCallback, errorCallback) {
        console.log('DB - updateUser ' + JSON.stringify(user));
        db.connection.query('UPDATE profile SET ' +
            'ds_profile = ?, ' +
            'id_program = ?, ' +
            'id_campus = ?, ' +
            'ds_bio = ? ' +
            'WHERE ds_email = ? ',
            [user.name, user.program, user.campus, user.bio, user.email],
            function(err, results) {
                if (err) return errorCallback(err);
                return successCallback(results);
            }
        );
    },

    deleteUser: function(email, successCallback, errorCallback) {
        console.log('DB - deleteUser ' + email);
        db.connection.query("DELETE FROM profile WHERE ds_email = ? ", [email],
            function(err, results) {
                if (err) return errorCallback(err);
                return successCallback(results);
            }
        );
    }
}