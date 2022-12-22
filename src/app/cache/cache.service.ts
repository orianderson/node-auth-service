interface Query {
  key: string;
  value: any;
}
export abstract class ICacheService {
  abstract create(query: Query): Promise<any>;
  abstract get(query: any): Promise<any>;
  abstract delete(query: any): Promise<any>;
}
