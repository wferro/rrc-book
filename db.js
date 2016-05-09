var mysql      = require('mysql');

function initializeDBConnection(config) {

    function addErrorHandler(connection) {
        connection.on("error", function (error) {
            if (error.code === "PROTOCOL_CONNECTION_LOST") {
                console.error(error.stack);
                console.log("Lost DB db. Reconnecting...");
                initializeDBConnection(connection.config);
            } else if (error.fatal) {
                throw error;
            }
        });
    }

    var connection = mysql.createConnection(config);
    addErrorHandler(connection);
    connection.connect();

    return connection;
}

module.exports = {

    connection :  initializeDBConnection({
                        host     : '192.168.56.1',
                        user     : 'wferro',
                        password : '123456',
                        database : 'rrcbook'
                    }),

    error :       function (code, message) {
                        this.code = code;
                        this.message = message;
                    }
}