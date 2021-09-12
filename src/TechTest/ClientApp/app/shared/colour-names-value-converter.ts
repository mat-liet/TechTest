import { IColour } from '../people/interfaces/icolour';

export class ColourNamesValueConverter {

  toView(colours: IColour[]) {

    // TODO: Step 4
    //
    // Implement the value converter function.
    // Using the colours parameter, convert the list into a comma
    // separated string of colour names. The names should be sorted
    // alphabetically and there should not be a trailing comma.
    //
      // Example: 'Blue, Green, Red'

      // Sort the colours by their name first
      colours.sort(function (colA, colB) {
          if (colA.name < colB.name) { return -1; }
          if (colA.name > colB.name) { return 1; }
          return 0;
      });

      var colourString = "";
      for (let i = 0; i < colours.length; i++) {
          if (i != colours.length - 1) {
              colourString += colours[i].name + ", ";
          } else {
              colourString += colours[i].name;
          }
      }
      return colourString;
  }

}
