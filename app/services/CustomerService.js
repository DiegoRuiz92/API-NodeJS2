const CustomerService = module.exports
const CustomerRepository = require('../repositories/CustomerRepository')
const AccountRepository = require('../repositories/AccountRepository')

//*Crear Cliente
CustomerService.create = async (customer) => {
    //buscamos el cliente por id para verificar si existe
    const customerFound = await CustomerRepository.findByID(customer.id)

    //si la lista de resultados su tamaño es mayor que cero
    //es porque existe un cliente con esa cedula
    if (customerFound.length > 0) {
        throw new Error('Customer already exist')
    }

    //se crea el cliente
    await CustomerRepository.create(customer)
}

//*Editar Cliente
CustomerService.edit = async (id, customer) => {
    //Buscamos el cliente por id para verificar si existe
    const customerFound = await CustomerRepository.findByID(id)
    //Si la lista de resultados su tamaño es cero
    //es porque no existe un cliente con esa cedula

    if (customerFound.length === 0) {
        throw new Error('Customer does not exist')
    }

    //Se actualiza el cliente
    await CustomerRepository.edit(id, customer)
}

//*Eliminar Cliente
CustomerService.delete = async(idCustomer) => {
    //Se consultan las cuentas del cliente, se usa await porque debemos
    //esperar ese resultado para poder seguir
    const customerAccounts = await AccountRepository.listAccountsByCustomer(idCustomer)
    //Si el tamano de la lista es mayor a cero es porque tiene cuentas
    // y se lanza la excepción
    if (customerAccounts.length > 0) {
        throw new Error('Customers with accounts, cannot be deleted')
    }
    //Se elimina el cliente...
    await CustomerRepository.delete(idCustomer)
}

//*Buscar Cliente
CustomerService.findCustomer = async(idCustomer) => {
    const customers = await CustomerRepository.findByID(idCustomer)
    if (customers.length === 0) return undefined;
    return customers[0];
}