export interface IUser {
  username: string;
  password: string;
  bio?: string;
  location?: string;
}

export interface IRecipe {
  title: string;
  description: string;
  instructions: string;
  ingredients: string;
  recipe_creator_id: number;
}
