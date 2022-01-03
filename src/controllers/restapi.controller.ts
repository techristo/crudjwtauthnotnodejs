// Uncomment these imports to begin using these cool features!
import { PeopleService } from "../services";
import { inject } from '@loopback/core';
import { get, param } from '@loopback/rest';


export class RestapiController {
  constructor(@inject('services.PeopleService')
  protected peopleService: PeopleService,) { }

  @get('/people/{personId}')
  async getCharacter(
    @param.path.integer('personId') personId: number,
  ): Promise<object> {
    //Preconditions

    return this.peopleService.getCharacter(personId);
  }
}
