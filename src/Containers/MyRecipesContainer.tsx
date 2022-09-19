import axios from "axios";
import { IUser } from "../interfaces";

export const MyRecipesContainer = (props: any) => {
    const {token, user} = props;

    console.log(token )
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
          console.log(data);
          return data;
        } catch (error) {
        // add action
          return error;
        }
      };
    


    return(<>{getMyRecipes(user.id)}</>)
}