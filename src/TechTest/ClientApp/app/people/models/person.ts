import { computedFrom } from 'aurelia-framework';
import { IPerson } from '../interfaces/iperson';
import { IColour } from '../interfaces/icolour';

export class Person implements IPerson {

  constructor(person: IPerson) {
    this.id = person.id;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.authorised = person.authorised;
    this.enabled = person.enabled;
    this.colours = person.colours;
  }

  id: number;
  firstName: string;
  lastName: string;
  authorised: boolean;
  enabled: boolean;
  colours: IColour[];

  @computedFrom('firstName', 'lastName')
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @computedFrom('fullName')
  get palindrome(): boolean {

    // TODO: Step 5
    //
    // Implement the palindrome computed field.
    // True should be returned When the FullName is spelt the same
    // forwards as it is backwards. The match should ignore any
    // spaces and should also be case insensitive.
    //
    // Example: 'Bo Bob' is a palindrome.

      // Remove white space between the names and turn string to lowercase.
      var lowerFullNameNoSpace: string = this.fullName.replace(/\s/g, "").toLowerCase();
      var isPalindrome = false;

      //Split lower case full name string to char array so that I can create a string from it.
      var charArr = lowerFullNameNoSpace.split("");
      var palindromeStr = "";
      for (let i = charArr.length - 1; i >= 0; i--) {
          palindromeStr += charArr[i];
      }

      //Check if palindrome string matches the original full name string.
      if (palindromeStr.localeCompare(lowerFullNameNoSpace) == 0) {
          isPalindrome = true;
      }
      
      return isPalindrome;
  }
}
