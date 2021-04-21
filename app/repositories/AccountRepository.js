const AccountRepository = module.exports
const DB = require('../config/database') //importar el módulo knex definido en el archivo database.js

AccountRepository.create = (account) => {
    return DB('accounts').insert(account)
}

AccountRepository.delete = (accountId) => {
    return DB('accounts').where({id: accountId}).del()
}

AccountRepository.edit = (accountId, account) => {
    return DB('accounts').where({id: accountId}).update(account)
}

AccountRepository.listAccountsByCustomer = (customerId) => {
    return DB('accounts').where({customerid: customerId}).select('*')
}

AccountRepository.extractAccountInfo = (accountId) => {
    return DB('accounts').where({id: accountId}).select('*')
}