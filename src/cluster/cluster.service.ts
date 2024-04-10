import cluster from 'node:cluster'
import * as os from 'os'
import { Injectable, Logger } from "@nestjs/common";
import * as process from "process";
const numCPUs = os.cpus().length

@Injectable()
export class AppClusterService {
  private static logger = new Logger(AppClusterService.name)
  static clusterize(callback: Function): void {
    if (cluster.isMaster) {
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
      }
      cluster.on('exit', (worker, code, signal) => {
        this.logger.log(`Cluster ${worker.process.pid} died. Restarting`)
        cluster.fork()
      })
    } else {
      console.log(`Cluster server started on ${process.pid}`)
      callback()
    }
  }
}