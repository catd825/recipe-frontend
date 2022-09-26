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

export const RecipeCard = (recipe: IRecipe) => {
  const avatar = recipe.creator_name.charAt(0);
  const limitedDescription =
    recipe.description.split(" ").slice(0, 25).join(" ") + "...";

  return (
    <NavLink to={`/recipes/${recipe.id}`}>
      <Grid style={{ margin: 20 }}>
        <Card sx={{ maxWidth: 345 }}>
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
          <CardMedia
            component="img"
            height="194"
            image={recipe.img_url}
            alt={recipe.title}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {limitedDescription}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </NavLink>
  );
};
