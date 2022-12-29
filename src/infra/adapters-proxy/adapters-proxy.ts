export class AdaptersProxy<T> {
  constructor(private readonly adapter: T) {}
  getInstance(): T {
    return this.adapter;
  }
}
