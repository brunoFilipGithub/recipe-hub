import { Ingredient } from "./ingredient";
import { Step } from "./step";

export interface Recipe {
    Id : number,
    UserId : number,
    Name : string,
    Description : string,
    Ingredients : Ingredient[],
    Steps : Step[],
    ImageString : string
}