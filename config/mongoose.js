const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contacts_list_db');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Successfully connected to the database");
    });
    