const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let loans = [];
let loanIdCounter = 0;

app.post('/apply-loan', (req, res) => {
    const { amount, property } = req.body;
    const loan = {
        id: loanIdCounter++,
        amount,
        property,
        status: 'Pending'
    };
    loans.push(loan);
    res.json({ success: true });
});

app.get('/loans', (req, res) => {
    res.json(loans);
});

app.post('/approve-loan', (req, res) => {
    const { loanId } = req.body;
    const loan = loans.find(l => l.id === loanId);
    if (loan) {
        loan.status = 'Approved';
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.post('/reject-loan', (req, res) => {
    const { loanId } = req.body;
    const loan = loans.find(l => l.id === loanId);
    if (loan) {
        loan.status = 'Rejected';
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.post('/disburse-loan', (req, res) => {
    const { loanId } = req.body;
    const loan = loans.find(l => l.id === loanId);
    if (loan) {
        loan.status = 'Disbursed';
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
