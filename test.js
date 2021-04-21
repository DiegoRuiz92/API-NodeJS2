//importando el repositorio...
const ClienteRepository = require('./app/repositories/CustomerRepository')
const CustomerService = require('./app/services/CustomerService')
const AccountRepository = require('./app/repositories/AccountRepository')
const AccountService = require('./app/services/AccountService')

console.log('Probando...')

//*Pruebas ClienteRepository
/* ClienteRepository.create({
    name: 'Juan',
    lastname: 'Ferrer',
    id: "4321",
    email: 'juan@juan.com'
}).then(console.log)//Para que el programa espere a que la operación termine... 

async function probandoElBuscar(){
    const cliente = await ClienteRepository.findByID('4321')
    console.log(cliente)
}
probandoElBuscar().then(console.log('Ok'))

async function probandoElEditar(){
    await ClienteRepository.edit('4321',{
        name:'Jose',
        lastname: 'Perez'
    })
}
probandoElEditar().then(console.log('Ok'))

async function pobrandoEliminar(){
    await ClienteRepository.delete('4321')
}
pobrandoEliminar().then(console.log('Ok')) */

//*Pruebas AccountRepository
/*AccountRepository.create({
    id: '004',
    amount: 100000,
    customerid: "1235",
    openedat: "2021-04-17"
}).then(console.log)*/

/*function listarCuentas() {
    async function probandoListarCuentas(){
        const list = await AccountRepository.listAccountsByCustomer('1234') 
        console.log(list)
    }
    probandoListarCuentas().then(console.log('Ok'));
}
listarCuentas();*/


/*async function pobrandoEliminarCuenta(){
    await AccountRepository.delete('0067')
}
pobrandoEliminarCuenta().then(console.log('Ok'))*/

//*Pruebas CustomerRepository - CustomerService
/*async function probarCrearCliente(){
    await CustomerService.create({
        name: 'Juan',
        lastname: 'Ferrer',
        id: "4321",
        email: 'juan@juan.com'
    })
}
probarCrearCliente().then(console.log('Ok'))*/

/*async function probarEditar(){
    await CustomerService.edit('1223232',{
        name: 'Obdulio',
        lastname: 'Quitian'
    })
}
probarEditar().then(console.log('Ok'))*/

/*async function probarEliminar(){
    await CustomerService.delete('1234')
}
probarEliminar().then(console.log('ok'))*/

/*async function probarBuscar(){
    const customer = await CustomerService.findCustomer('1234')
    console.log(customer)
}
probarBuscar().then(console.log('ok'))*/

//*Pruebas AccountService

/*async function probar(){
    const result = await AccountService.listAccountsByCustomer('12346')
    console.log(result)
}
probar().then(console.log('ok'))*/

/*async function probar(){
    const result = await AccountService.createC
    console.log(result)
}
probar().then(console.log('ok'))*/

/*async function probarEliminar(){
    await AccountService.delete('005')
}
probarEliminar().then(console.log('ok'))*/

/*async function probarRetirar(){
    await AccountService.consign('002',0)
}
probarRetirar().then(console.log('ok'))*/

async function transfer(){
    await AccountService.transfer({
        id1: '002',
        id2: '003'
    },5000)
}
transfer().then(console.log('ok'))