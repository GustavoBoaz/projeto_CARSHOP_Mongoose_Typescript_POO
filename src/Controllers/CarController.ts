import express, { Request, Response } from 'express';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import IService from '../Interfaces/IService';
import CarService from '../Services/CarService';
import AbstractController from './AbstractController';

class CarController extends AbstractController<IService<ICar, Car>> {
  constructor() {
    super(new CarService());
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

  initRoutes(): express.Router {
    this.router.post('/', this.service.isValidBody, (req, res) => this.create(req, res));
    this.router.get('/', (req, res) => this.readAll(req, res));
    this.router.get('/:id', (req, res) => this.readById(req, res));
    this.router.put('/:id', this.service.isValidBody, (req, res) => this.update(req, res));
    this.router.delete('/:id', (req, res) => this.delete(req, res));
    return this.router;
  }
}

export default CarController;