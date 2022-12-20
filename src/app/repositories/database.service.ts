export abstract class IDataBaseService {
  abstract create(query: any): Promise<any>;
  abstract update(query: any): Promise<any>;
  abstract getOne(field: string, id: any, query: any): Promise<any>;
  abstract delete(query: any): Promise<any>;
  abstract getAll(query: any): Promise<any>;
}
