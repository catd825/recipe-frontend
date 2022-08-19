import axios from "axios";
import { useEffect, useState } from "react";
import { RecipeList } from "../Components/RecipeList";

export const RecipeContainer = (token: any) => {
  const [recipes, setRecipes] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllRecipes = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };

    let url = "http://localhost:3000/recipes";
    const { data } = await axios(url, config);
    setRecipes(data);
    return data;
  };

  useEffect(() => {
    getAllRecipes();
  }, [getAllRecipes]);

  return <>{recipes.length > 0 && <RecipeList recipes={recipes} />}</>;
};
