const AccountController = module.exports
//importando el modulo de la logica
const AccountService = require('../services/AccountService');
const { param } = require('./routes');

AccountController.listAccountsByCustomer = (req, res, next) => {
    const params = req.params;

    try {
        const response = await AccountService.listAccountsByCustomer(params.id)

        //enviando respuesta al cliente que retorna la logica
        res.send(response)
        //------------------------------
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}

AccountController.createAccount = async (req, res, next) => {
    const body = req.body;

    try {
        await AccountService.create(body)
        res.send({message: 'account created'})
        //-------------------------------
    } catch (error) {
        console.log({error});
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}

AccountController.consignAccount = async (req, res, next) => {
    
    const params = req.params;
    
    const body = req.body;

    try {
        await AccountService.consign(param.id, body.amount)
        res.send({message: 'consignation succeeded'})
        //-------------------------------
    } catch (error) {
        console.log({error});
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}

AccountController.withdraw = async (req, res, next) => {
    
    const params = req.params;
    
    const body = req.body;

    try {
        await AccountService.withdraw(param.id, body.amount)
        res.send({message: 'operation succeeded'})
        //-------------------------------
    } catch (error) {
        console.log({error});
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}

AccountController.transfer = async (req, res, next) => {

    const body = req.body;

    try {
        await AccountService.transfer(body, body.amount)
        res.send({message: 'transfer succeeded'})
        //-------------------------------
    } catch (error) {
        console.log({error});
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}

AccountController.delete = async (req, res, next) => {
    //extrayendo los PathParams de la peticion
    const params = req.params;

    try {
        //se supone que el id llega asi /customer/:id (aca no es con {} sino con :)
        //await (ya que el metodo es async) para esperar que termine.
        await AccountService.delete(params.id)

        //enviando respuesta al cliente (postman por ejemplo)
        res.send({message: 'account deleted'})
        //_____________________________________
    } catch (error) { //manejando las excepciones...
        console.log({error});
        //retornando la cuenta(postman por ejemplo) el error..
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}
