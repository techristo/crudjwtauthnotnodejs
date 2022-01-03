import { Provider } from '@loopback/core';
import { RestdsDataSource } from '../datasources';
export interface PeopleService {
    getCharacter(personId: number): Promise<object>;
}
export declare class PeopleServiceProvider implements Provider<PeopleService> {
    protected dataSource: RestdsDataSource;
    constructor(dataSource?: RestdsDataSource);
    value(): Promise<PeopleService>;
}
