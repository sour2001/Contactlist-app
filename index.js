const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('assests'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async function(req, res) {
    try {
        let contacts = await Contact.find({});
        return res.render('home', {
            title: "Contact List",
            contact_list: contacts
        });
    } catch (err) {
        console.log('Error in fetching contacts from db');
        return res.redirect('back');
    }
});

app.get('/local', function(req, res) {
    console.log("Local", req.myName);
    return res.render('local', {
        title: "Playground"
    });
});

app.post('/create-contact', async function(req, res) {
    try {
        await Contact.create({
            name: req.body.name,
            phone: req.body.phone
        });
        return res.redirect('back');
    } catch (err) {
        console.log('Error in creating a contact');
        return res.redirect('back');
    }
});


app.get('/delete-contact', async function(req, res) {
    try {
        let id = req.query.id;
        await Contact.findByIdAndDelete(id);
        return res.redirect('back');
    } catch (err) {
        console.log('Error in deleting a contact');
        return res.redirect('back');
    }
});

app.listen(port, function(err) {
    if (err) {
        console.log('Error in running the server', err);
    }
    console.log('Yup! My Express server is running on Port:', port);
});
