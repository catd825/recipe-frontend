import { IRecipe } from "../interfaces";
import { RecipeCard } from "./RecipeCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export interface IProps {
  recipes: IRecipe[];
}

export const RecipeList = (props: IProps) => {
  const { recipes} = props;

  const mapRecipes = recipes.map((recipe: IRecipe) => {
    return (
      <Box sx={{ display: "inline-flex" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <RecipeCard recipe={recipe} key={recipe.id} />
        </Grid>
      </Box>
    );
  });

  return <>{mapRecipes}</>;
};
