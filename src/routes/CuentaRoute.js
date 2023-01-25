import CuentaAhorroCtrl from "../controllers/Cuenta.controller.js";

const CuentaRoute =(fastify, opts, done)=>{

    fastify.post("/register", CuentaAhorroCtrl.register);
    fastify.post("/login", CuentaAhorroCtrl.login);

    done();
}

export default CuentaRoute;