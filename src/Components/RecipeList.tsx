import { RecipeCard } from "./RecipeCard";

export const RecipeList = (props: any) => {
  const { recipes } = props;

  const mapRecipes = recipes.map((recipe: any) => <RecipeCard {...recipe} />);

  return <>{mapRecipes}</>;
};
