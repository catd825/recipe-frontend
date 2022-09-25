import { NavLink } from "react-router-dom";
import { IRecipe } from "../interfaces";
import Grid from "@mui/material/Grid";

export const RecipeCard = (recipe: IRecipe) => {
  return (
    <Grid item xs={2} sm={4} md={4} style={{ maxWidth: "360px", margin: 20 }}>
      <img alt="recipe_img" src={recipe.img_url} width="350" height="250" />
      <NavLink to={`/recipes/${recipe.id}`}>{recipe.title}</NavLink>
    </Grid>
  );
};
