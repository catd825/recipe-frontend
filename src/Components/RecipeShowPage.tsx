import Container from "@mui/material/Container";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import IconButton from "@mui/material/IconButton";

export const RecipeShowPage = (props: any) => {
  const { recipe } = props;
  console.log(recipe);
  const convertedDesc = (
    <div dangerouslySetInnerHTML={{ __html: recipe.description }}></div>
  );

  const [isFavorite, setIsFavorite] = useState(recipe.liked_by_current_user);
  const [favoriteId, setFavoriteId] = useState(recipe.favorite_id);
  const authContext = useContext(AuthContext);

  const addFavorite = () => {
    axios
      .post(
        "http://localhost:3000/favorite_recipes",
        {
          recipe_id: recipe.id,
          recipe_liker_id: authContext?.user.id
        },
        {
          headers: {
            Authorization: `Bearer ${authContext?.token}`
          }
        }
      )
      .then(function (response) {
        setIsFavorite(true);
        setFavoriteId(response.data.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removeFavorite = (id: number) => {
    axios
      .delete(`http://localhost:3000/favorite_recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${authContext?.token}`
        }
      })
      .then(function (response) {
        setIsFavorite(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Container fixed>
        <h3 style={{ textAlign: "center" }}>{recipe.title}</h3>
        <img
          style={{ display: "block", margin: "auto" }}
          src={recipe.img_url}
          alt={recipe.title}
        />
        <IconButton aria-label="add to favorites">
          <BookmarkIcon
            sx={{ color: isFavorite ? "blue" : "black" }}
            onClick={
              isFavorite
                ? () => removeFavorite(favoriteId)
                : () => addFavorite()
            }
          />
        </IconButton>
        <p>Author: {recipe.creator_name}</p>
        <p>Description: {convertedDesc}</p>
      </Container>
    </>
  );
};
