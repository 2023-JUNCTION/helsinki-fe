import TransportBase from './TransportBase';

class Test extends TransportBase {
  public constructor() {
    super('healthCheck');
  }

  public readHealthCheck(): Promise<string> {
    return this.http.get('').then(TransportBase.handleResponse).catch(TransportBase.handleError);
  }
}

export default new Test();
