import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeList } from "../Components/RecipeList";
import { RecipeShowPage } from "../Components/RecipeShowPage";
import { IUser } from "../interfaces";

interface IProps {
  token: string | null;
  user: IUser | boolean;
}

export const RecipeContainer = (props: IProps) => {
  const { token, user } = props;
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [recipes, setRecipes] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const getAllRecipes = async () => {
    let url = "http://localhost:3000/recipes";

    const { data } = user ? await axios(url, config) : await axios(url);
    setRecipes(data);
    return data;
  };

  const getRecipe = async () => {
    let url = `http://localhost:3000/recipes/${id}`;

    const { data } = await axios(url, config);
    setRecipe(data);
    return data;
  };

  useEffect(() => {
    if (!id) {
      getAllRecipes();
    } else {
      getRecipe();
    }
  }, []);

  return (
    <>
      {id && token && user ? (
        <RecipeShowPage user={user} token={token} recipe={recipe} />
      ) : (
        <div>
          Recipe list
          <br />
          {recipes.length > 0 && <RecipeList recipes={recipes} />}
        </div>
      )}
    </>
  );
};
