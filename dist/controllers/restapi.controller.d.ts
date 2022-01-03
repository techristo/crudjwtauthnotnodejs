import { PeopleService } from "../services";
export declare class RestapiController {
    protected peopleService: PeopleService;
    constructor(peopleService: PeopleService);
    getCharacter(personId: number): Promise<object>;
}
