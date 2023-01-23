import { Request, Response, Router } from 'express';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import IService from '../Interfaces/IService';
import MotorcycleService from '../Services/MotorcycleService';
import AbstractController from './AbstractController';

class MotorcycleController extends AbstractController<IService<IMotorcycle, Motorcycle>> {
  constructor() {
    super(new MotorcycleService());
  }

  private async create(req: Request, res: Response): Promise<Response> {
    const result = await this.service.create(req.body);
    return res.status(201).json(result);
  }

  private async readAll(req: Request, res: Response): Promise<Response> {
    const result = await this.service.readAll();
    return res.status(200).json(result);
  }

  private async readById(req: Request, res: Response): Promise<Response> {
    const result = await this.service.readById(req.params.id);
    return res.status(200).json(result);
  }

  private async update(req: Request, res: Response): Promise<Response> {
    const result = await this.service.update(req.params.id, req.body);
    return res.status(200).json(result);
  }

  private async delete(req: Request, res: Response): Promise<Response> {
    await this.service.delete(req.params.id);
    return res.status(204).send();
  }

  initRoutes(): Router {
    this.router.post('/', this.service.isValidBody, (req, res) => this.create(req, res));
    this.router.get('/', (req, res) => this.readAll(req, res));
    this.router.get('/:id', (req, res) => this.readById(req, res));
    this.router.put('/:id', this.service.isValidBody, (req, res) => this.update(req, res));
    this.router.delete('/:id', (req, res) => this.delete(req, res));
    return this.router;
  }
}

export default MotorcycleController;