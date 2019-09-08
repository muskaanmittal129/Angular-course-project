
import { Recipe } from './recipe.model';
import { Injectable} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'; 
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class RecipeService{
    //recipeSelected = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();
     
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

addRecipe(recipe:Recipe){
this.recipes.push(recipe);
this.recipesChanged.next(this.recipes.slice());
}

updateRecipe(index:number, newRecipe:Recipe){
this.recipes[index] = newRecipe;
this.recipesChanged.next(this.recipes.slice());
}

deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());;
}
}