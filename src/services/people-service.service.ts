import { inject, Provider } from '@loopback/core';
import { getService } from '@loopback/service-proxy';
import { RestdsDataSource } from '../datasources';

export interface PeopleService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getCharacter(personId: number): Promise<object>;
}

export class PeopleServiceProvider implements Provider<PeopleService> {
  constructor(
    // restds must match the name property in the datasource json file
    @inject('datasources.restds')
    protected dataSource: RestdsDataSource = new RestdsDataSource(),
  ) { }

  value(): Promise<PeopleService> {
    return getService(this.dataSource);
  }
}
