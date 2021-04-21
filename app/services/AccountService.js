const AccountService = module.exports
const CustomerRepository = require('../repositories/CustomerRepository')
const AccountRepository = require('../repositories/AccountRepository')

AccountService.listAccountsByCustomer = async (customerId) =>{
    //Buscamos el cliente por id para verificar si existe
    const customerFound = await CustomerRepository.findByID(customerId)
    //Si la lista de resultados su tamano es cero
    //Es porque no existe un cliente con esa cédula
    if (customerFound.length === 0) {
        throw new Error('Customer does not exist')
    }

    //Cuando se retorna directamente el resultado de una función que
    //haya que esperar el resultado, no es necesario usar el await..
    return AccountRepository.listAccountsByCustomer(customerId)
}

AccountService.create = async (account) => {
    //buscamos el cliente por id para verificar si existe
    const customerFound = await CustomerRepository.findByID(account.customerid)
    //Si la lista de resultados su tamano es cero
    //Es porque no existe un cliente con esa cédula
    
    if (customerFound.length === 0) {
        throw new Error('Customer does not exist')
    }
    //Consultando las cuentas del cliente..., el id del cliente viene en el objeto
    const accountsByCustomer = await AccountRepository.listAccountsByCustomer(account)

    //Verificando que solo tenga hasta tres...
    if (accountsByCustomer.length >= 3) {
        throw new Error('No more than 3 accounts')
    }

    account.openedAt = new Date(); //Colocando la fecha de apertura
    account.amount = 0; //Colocando el saldo inicial
    await AccountRepository.create(account)
}

//*Eliminar cuenta
AccountService.delete = async(accountId) => {
    const accountToDelete = await AccountRepository.extractAccountInfo(accountId)
    //console.log(accountToDelete)

    if (accountToDelete.length === 0) {
        throw new Error('account does not exist')
    }

    if (accountToDelete[0].amount != 0) {
        throw new Error('account cannot be deleted with funds')
    }
    await AccountRepository.delete(accountId)
}

AccountService.withdraw = async(accountId, amount) =>{
    const accountToWithdraw = await AccountRepository.extractAccountInfo(accountId)
    //console.log(accountToDelete)

    if (accountToWithdraw.length === 0) {
        throw new Error('account does not exist')
    }

    if (accountToWithdraw[0].amount <= 0) {
        throw new Error('account without funds')
    }

    let monto = accountToWithdraw[0].amount - amount;
    accountToWithdraw[0].amount = monto

    await AccountRepository.edit(accountId, accountToWithdraw[0])
}

AccountService.consign = async(accountId, amount) =>{
    const accountConsign = await AccountRepository.extractAccountInfo(accountId)
    //console.log(accountToDelete)

    if (accountConsign.length === 0) {
        throw new Error('account does not exist')
    }

    if (amount <= 0) {
        throw new Error('invalid consignation')
    }

    let monto = accountConsign[0].amount + amount;
    accountConsign[0].amount = monto

    await AccountRepository.edit(accountId, accountConsign[0])
}

AccountService.transfer = async (accountId, amountTransfer) => {
    
    const account1 = await AccountRepository.extractAccountInfo(accountId.id1);
    const account2 = await AccountRepository.extractAccountInfo(accountId.id2);
    console.log(account1)

    if (account1.length == 0) {
        throw new Error('Account to transfer doesnt exist');
    }
    if (account2.length == 0) {
        throw new Error('Account withdraw doesnt exist');
    }
    if (amountTransfer <= 0) {
        throw new Error('Invalid consign');
    }
    //Add transfer account1
    let amount1 = account1[0].amount + amountTransfer; //39500 + 45000
    account1[0].amount = amount1;
    //subtract tranfer account2
    let amount2 = account2[0].amount - amountTransfer; //100500 - 45000
    account2[0].amount = amount2;

    await AccountRepository.edit(accountId.id1, account1[0]);
    await AccountRepository.edit(accountId.id2, account2[0]);
}