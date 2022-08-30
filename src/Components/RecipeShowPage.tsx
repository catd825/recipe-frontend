import { useParams } from "react-router-dom"

export const RecipeShowPage = (props: any) => {
    const { recipe } = props
    const { id } = useParams()
    return(<>Recipe {id}, created by {recipe.creator_name} </>)
}