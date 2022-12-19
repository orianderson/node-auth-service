export class ControllersProxy<T> {
  constructor(private readonly controller: T) {}
  getInstance(): T {
    return this.controller;
  }
}
