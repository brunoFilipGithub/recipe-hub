import { Recipe } from "./recipe";
import { User } from "./user";

export interface ViewRecipeResponse {
    User : User,
    Recipe : Recipe
}