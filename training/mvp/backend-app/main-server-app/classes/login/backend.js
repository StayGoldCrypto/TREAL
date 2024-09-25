const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));

let loans = [];
let properties = [];
let users = [{ username: 'admin', password: 'admin' }];
let loanIdCounter = 0;
let propertyIdCounter = 0;

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.user = user;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.post('/apply-loan', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false });
    }
    const { amount, property } = req.body;
    const loan = {
        id: loanIdCounter++,
        amount,
        property,
        status: 'Pending',
        applicant: req.session.user.username
    };
    loans.push(loan);
    res.json({ success: true });
});

app.get('/loans', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false });
    }
    res.json(loans);
});

app.post('/approve-loan', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false });
    }
    const { loanId } = req.body;
    const loan = loans.find(l => l.id === loanId);
    if (loan) {
        loan.status = 'Approved';
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.post('/reject-loan')
