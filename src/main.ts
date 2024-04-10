import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppClusterService } from "./cluster/cluster.service";
import { ConfigService } from "@nestjs/config";
import * as os from 'os'
import { Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";

//----------------DEFAULT----DEFAULT------DEFAULT----DEFAULT--------DEFAULT-------DEFAULT--------DEFAULT---------DEFAULT-------
// async function bootstrap() {
//   const app = await NestFactory.createMicroservice(AppModule, {
//     transport: Transport.REDIS,
//     options: {
//       host: 'localhost',
//       port: 6379,
//     },
//     }
//   )
  // const port = 3000
  // await app.listen(port, ()=>console.log(`server started on port: ${port}`))
// }
// bootstrap()

//--------------CONTEXT----------CONTEXT-----------------CONTEXT---------------CONTEXT------------CONTEXT---------CONTEXT--------
// async function bootstrap() {
//   const app = NestFactory.createApplicationContext(AppModule);
//   const port = process.env.PORT || 3000
//   await app.finally(()=>console.log(`server started on port: ${port}`))
// }
// bootstrap()
//--------------CLUSTER----------------CLUSTER---------------CLUSTER-----------------CLUSTER--------------CLUSTER----
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000
  await app.listen(port,()=>console.log('server started on port:'+ port));
}

AppClusterService.clusterize(bootstrap)
//--------------WORKERS-------------WORKERS--------------WORKERS--------------WORKERS
//
// workers like this
//
// const { workerData, parentPort } = require('worker_threads');
// const { NestFactory } = require('@nestjs/core');
// const { AppModule } = require('./app.module'); // Import your AppModule
//
// async function bootstrap() {
//   const appContext = await NestFactory.createApplicationContext(AppModule);
// // Use appContext to get services and providers
//
// // Example of handling messages from the main thread
//   parentPort.on('message', (message) => {
//     console.log('Message from main thread:', message);
// // You can call your services here
//   });
// }
//
// bootstrap();














//const logger = new Logger('bootstrap');
//
// // I create a 'dummy' app to be able to get a reference to the config service
// const configApp = await NestFactory.create(AppModule);
//
// let configService = configApp.get(ConfigService);
//
// const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//   AppModule,
//   {
//     transport: Transport.TCP,
//     options: {
//       port: configService.get('app.port')
//     }
//   },
// );
// app.listen(() => logger.log(`BEI microservice listening on port ${configService.get('app.port')}`));