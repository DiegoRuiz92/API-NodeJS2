const express = require('express');
const CustomerController = require('../controllers/CustomerController')
const AccountController = require('../controllers/AccountController')

const router = express.Router();

router.delete('/customers/:id', CustomerController.delete);
router.put('/customers/:id', CustomerController.edit);
router.get('/customers/:id/accounts', AccountController.listAccountsByCustomer);

router.post('/accounts', AccountController.createAccount);
router.put('/accounts/:id/withdraw', AccountController.edit);
router.put('/accounts/:id/consign', AccountController.consignAccount);
router.put('/accounts/:id/transfer', AccountController.withdraw);
router.delete('/accounts/:id', AccountController.delete);

module.exports = router;