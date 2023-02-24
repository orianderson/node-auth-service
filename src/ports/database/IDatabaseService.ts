export abstract class IDatabaseService {
  abstract exist(query: any): Promise<boolean>;
  abstract create(query: any): Promise<void>;
  abstract get(query: any): Promise<any>;
  abstract delete(query: any): Promise<any>;
  abstract update(query: any): Promise<any>;
}
