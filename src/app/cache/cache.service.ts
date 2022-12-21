export abstract class ICacheService {
  abstract create(query: any): Promise<any>;
  abstract get(query: any): Promise<any>;
  abstract delete(query: any): Promise<any>;
}
