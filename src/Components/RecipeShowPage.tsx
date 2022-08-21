import { useParams } from "react-router-dom"

export const RecipeShowPage = (props: any) => {
    console.log(props)
    const { recipe } = props

    const { id } = useParams()
    return(<>Recipe {id}, created by {recipe.recipe_creator_id.name} </>)
}