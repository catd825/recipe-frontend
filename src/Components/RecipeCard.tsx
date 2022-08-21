import { Link, NavLink } from "react-router-dom";
import { IRecipe } from "../interfaces";

export const RecipeCard = (recipe: IRecipe) => {
  return (
    <p>
      <NavLink to={`/recipes/${recipe.id}`}>{recipe.title}</NavLink>
    </p>
  );
};
