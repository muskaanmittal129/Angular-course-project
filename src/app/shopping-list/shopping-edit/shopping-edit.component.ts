import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  @ViewChild('f',{static:false}) slForm:NgForm;
 subscription:Subscription;
editmode  =false;
edittedItemIndex:number;
edittedItem:Ingredient;
 
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditting.subscribe(
      (index:number) =>{
        this.editmode = true;
        this.edittedItemIndex = index;
        this.edittedItem  = this.slService.getIngredient(index);
        this.slForm.setValue({
          name:this.edittedItem.name,
          amount:this.edittedItem.amount,
        })
      }
    )
  }
  onSubmit(form:NgForm){
    const value = form.value;
    const newIngredient = new Ingredient (value.name, value.amount);
    
    if(this.editmode){
      this.slService.updateIngredient(this.edittedItemIndex, newIngredient);
    }
    else
    {this.slService.addIngredient(newIngredient);}
    this.editmode = false;
    form.reset();
  }

  
  onClear(){
    this.slForm.reset();
    this.editmode = false;
  }
  
  onDelete(){
    this.slService.deleteIngredient(this.edittedItemIndex);
    this.onClear();
  }
   
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  

}
