import axios from "axios";
import { useEffect, useState } from "react";
import { RecipeList } from "../Components/RecipeList";

export const FavoriteRecipesContainer = (props: any) => {
  const { token, user } = props;
  const [myFavoriteRecipes, setMyFavoriteRecipes] = useState([]);
  const [recipeIsFavorited, setRecipeIsFavorited] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const getMyFavoriteRecipes = async (userId: any) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/${userId}/favorite_recipes`,
        config
      );
      const { data } = response;
      setMyFavoriteRecipes(data);

      return data;
    } catch (error) {
      // add action
      return error;
    }
  };

  useEffect(() => {
    if (user.id) {
      getMyFavoriteRecipes(user.id);
    }
  }, []);

  console.log(recipeIsFavorited)
  
  return (
    <>
      My Recipes
      <br />
      <RecipeList recipeIsFavorited={recipeIsFavorited} recipes={myFavoriteRecipes} />
    </>
  );
};
