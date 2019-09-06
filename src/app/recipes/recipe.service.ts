
import { Recipe } from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'; 
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();
     
   private recipes: Recipe[] = [
        new Recipe('A test recipe' , 
        'this is simply a test',
         'https://www.thecookierookie.com/wp-content/uploads/2019/08/pasta-pomodoro-recipe-3-of-7.jpg ',
         [new Ingredient('Meat',1),
          new Ingredient('french',20)
        ]),
         
        new Recipe('Delicious!!!' ,
         'this is simply a test',
          'https://www.thecookierookie.com/wp-content/uploads/2019/08/pasta-pomodoro-recipe-3-of-7.jpg ',
          [new Ingredient('burger',1),
          new Ingredient('toast',10)
        ])
        
    
    ];

    constructor(private slService:ShoppingListService){}
     
getRecipes(){
    return this.recipes.slice();
}

getRecipe(index:number){
    return this.recipes[index];
}
addIngredientToSl(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients);

}
}