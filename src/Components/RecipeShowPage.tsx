import Container from "@mui/material/Container";

export const RecipeShowPage = (props: any) => {
  const { recipe } = props;
  const convertedDesc = (
    <div dangerouslySetInnerHTML={{ __html: recipe.description }}></div>
  );
  return (
    <Container fixed>
      <h3 style={{textAlign: 'center'}}>{recipe.title}</h3>
      <img style={{display: 'block', margin: 'auto'}} src={recipe.img_url} alt={recipe.title}/>
      <p>Author: {recipe.creator_name}</p>
      <p>Description: {convertedDesc}</p>
    </Container>
  );
};
