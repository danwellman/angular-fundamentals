export class ActivatedRouteMock {
  public snapshot: any;

  constructor() {
    this.snapshot = {
      url: [{
        path: 'test'
      }]
    };
  }
}
