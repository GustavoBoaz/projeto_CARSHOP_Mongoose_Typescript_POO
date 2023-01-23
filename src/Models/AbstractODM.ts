import {
  isValidObjectId,
  Model,
  models,
  Schema,
  UpdateQuery,
  model,
} from 'mongoose';
import IdInvalidError from '../Errors/IdInvalidError';

const INVALID_FORMAT_ID = 'Invalid mongo id';

abstract class AbstractODM<T> {  
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema); 
  }

  public async create(obj: T): Promise<T> { 
    return this.model.create({ ...obj });
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new IdInvalidError(INVALID_FORMAT_ID);

    return this.model.findById(_id);
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new IdInvalidError(INVALID_FORMAT_ID);

    return this.model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async delete(_id: string): Promise<void> {
    await this.model.findByIdAndRemove(
      { _id },
    );
  }
}

export default AbstractODM;