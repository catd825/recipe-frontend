import axios from "axios";
import { useEffect, useState } from "react";
import { MyRecipeList } from "../Components/MyRecipeList";
import { RecipeList } from "../Components/RecipeList";

export const MyRecipesContainer = (props: any) => {
  const { token, user } = props;
  const [myRecipes, setMyRecipes] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const getMyRecipes = async (userId: any) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/${userId}/recipes`,
        config
      );
      const { data } = response;
      setMyRecipes(data);

      return data;
    } catch (error) {
      // add action
      return error;
    }
  };

  useEffect(() => {
    if (user.id) {
      getMyRecipes(user.id);
    }
  }, []);

  return (
    <div>
      My Recipes
      <br/>
      <RecipeList recipes={myRecipes} />
    </div>
  );
};
