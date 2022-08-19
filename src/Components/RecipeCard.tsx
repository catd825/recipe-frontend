import { IRecipe } from "../interfaces";

export const RecipeCard = (recipe: IRecipe) => {
  return <>{recipe.title}</>;
};
