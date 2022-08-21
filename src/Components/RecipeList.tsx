import { IRecipe } from "../interfaces";
import { RecipeCard } from "./RecipeCard";

export interface IProps {
  recipes: IRecipe[];
}

export const RecipeList = (props: IProps) => {
  const { recipes } = props;
  const mapRecipes = recipes.map((recipe: IRecipe) => {
    return <RecipeCard {...recipe} key={recipe.id}/>;
  });

  return <>{mapRecipes}</>;
};
