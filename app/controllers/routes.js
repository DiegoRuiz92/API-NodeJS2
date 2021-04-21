const express = require('express');
const CustomerController = require('../controllers/CustomerController')
const AccountController = require('../controllers/AccountController')

const router = express.Router();

router.delete('/customers/:id', CustomerController.delete);
router.put('/customers/:id', CustomerController.edit);
router.get('/customers/:id/accounts', AccountController.listAccountsByCustomer);
router.post('/accounts', AccountController.createAccount);
router.put('/customers/:id/withdraw', CustomerController.edit);
router.put('/customers/:id/consign', CustomerController.edit);

module.exports = router;