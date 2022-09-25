import { NavLink } from "react-router-dom";
import { IRecipe } from "../interfaces";

export const RecipeCard = (recipe: IRecipe) => {
  return (
    <div>
      <img alt="recipe_img" src={recipe.img_url} />
      <NavLink to={`/recipes/${recipe.id}`}>{recipe.title}</NavLink>
    </div>
  );
};
