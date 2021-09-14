import { autoinject } from 'aurelia-framework';
import { Router, RouteConfig } from 'aurelia-router'
import { HttpClient, json } from 'aurelia-fetch-client';
import { Person } from '../models/person';
import { IColour } from '../interfaces/icolour';
import { IPerson } from '../interfaces/iperson';
import { Repeat } from 'aurelia-templating-resources';

// 
/**
 * Had to add this so that the colour checkboxes work.
 * Link to similar issue: https://github.com/aurelia/templating-resources/issues/388
 * If this line below is removed, the colour checkboxes wont be checked when you enter the person edit screen.
 * You will still be able to add the colours but there will be duplicates due to the matcher not working.
 * */
Repeat.useInnerMatcher = false;

@autoinject
export class PersonEdit {

  constructor(private http: HttpClient, private router: Router) { }

  private heading: string;
  private person: Person;
  private colourOptions: IColour[] = [];
  private routerConfig: RouteConfig;

  async activate(params, routerConfig: RouteConfig) {
    this.routerConfig = routerConfig;

    const personResponse = await this.http.fetch(`/people/${params.id}`);
    this.personFetched(await personResponse.json());

    const colourResponse = await this.http.fetch('/colours');
    this.colourOptions = await colourResponse.json() as IColour[];
  }

  personFetched(person: IPerson): void {
    this.person = new Person(person)
    this.heading = `Update ${this.person.fullName}`;
    this.routerConfig.navModel.setTitle(`Update ${this.person.fullName}`);
  }

  colourMatcher(favouriteColour: IColour, checkBoxColour: IColour) {
    return favouriteColour.id === checkBoxColour.id;
  }

  async submit() {

    // TODO: Step 7
    //
    // Implement the submit and save logic.
    // Send a JSON request to the API with the newly updated
    // this.person object. If the response is successful then
      // the user should be navigated to the list page.
      // Create fetch response with PUT method to upgrade this.person
      //Set content type as JSON so error 415 is avoided
      const updateResponse = this.http.fetch('/people/' + this.person.id, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.person)
      })
      // Await response and if == 200 then we are good to go.
      if ((await updateResponse).status == 200) {
          this.router.navigate('people');
      }
        
  }

  cancel() {
    this.router.navigate('people');
  }
}
