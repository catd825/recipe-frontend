export interface IUser {
  username: string;
  password: string;
  bio?: string;
  location?: string;
  id?: number;
  name?: string;
}

export interface IRecipe {
  title: string;
  description: string;
  instructions: string;
  ingredients: string;
  recipe_creator_id: number;
  id: number;
  img_url: string;
  creator_name: string;
  created_at: string;
  // fix later
  favorite_id?: any;
  liked_by_current_user?: boolean;
}
