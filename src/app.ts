import express from 'express';
import 'dotenv/config';
import 'express-async-errors';
import CarController from './Controllers/CarController';
import MotorcycleController from './Controllers/MotorcycleController';
import ErrorHandler from './Middlewares/ErrorHadler';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.initAuthHeader();
    this.initRoutes();
    this.initMiddlewares();
  }

  /**
   * Este método configura acesso de entrada a sua api
   */
  private initAuthHeader(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  /**
   * Inicialize middlewares aqui
   */
  private initMiddlewares(): void {
    this.app.use(ErrorHandler.handle);
  }

  /**
   * Inicialize rotas aqui
   */
  private initRoutes(): void {
    this.app.use('/cars', new CarController().initRoutes());
    this.app.use('/motorcycles', new MotorcycleController().initRoutes());
  }
}

export default new App().app;