import { NavLink } from "react-router-dom";
import { IRecipe } from "../interfaces";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

export const RecipeCard = (recipe: IRecipe) => {
  const avatar = recipe.creator_name.charAt(0);
  const limitedDescription =
    recipe.description.split(" ").slice(0, 25).join(" ") + "...";
  const convertedDesc = (
    <div dangerouslySetInnerHTML={{ __html: limitedDescription }}></div>
  );
  const [isFavorite, setIsFavorite] = useState(false);
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
        console.log(response);
        setIsFavorite(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removeFavorite = (id: number) => {
    axios
      .delete(
        `http://localhost:3000/favorite_recipes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authContext?.token}`
          }
        }
      )
      .then(function (response) {
        console.log(response);
        setIsFavorite(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  return (
    <Grid style={{ margin: 20 }}>
      <Card sx={{ maxWidth: 345 }}>
        <NavLink to={`/recipes/${recipe.id}`}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {avatar}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={recipe.title}
            subheader={recipe.created_at}
          />
        </NavLink>
        <CardMedia
          component="img"
          height="194"
          image={recipe.img_url}
          alt={recipe.title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {convertedDesc}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon
              sx={{ color: isFavorite ? "red" : "black" }}
              onClick={() => addFavorite()}
            />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};
