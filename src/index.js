import cors from '@fastify/cors';
import Fastify from 'fastify';
import formbody from "@fastify/formbody"
import { connectDb } from './database.js';
import multer from 'fastify-multer';
import CuentaRoute from './routes/CuentaRoute.js';
connectDb();


//--------------------------------------------------------------------------------------------------------

const fastify = Fastify({
    logger: true
  })

//----------------------------------------------------------------------------------------------------------



//ruta de usuarios


fastify.register(cors,{origin: "*"});
fastify.register(formbody);
fastify.register(multer.contentParser)


fastify.register( CuentaRoute, {prefix: "/CuentaAhorro"})


const start = async () => {
    try {
      await fastify.listen({ port: 4000, host: "0.0.0.0" });
      console.log("escuchando por el puerto 4000")
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()