import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Subscription} from 'rxjs';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<{ name: string, amount: number }>();
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    // this.subscription = this.shoppingListService.stratedEditing
    //   .subscribe(
    //     (index: number) => {
    //       this.editMode = true;
    //       this.editedItemIndex = index;
    //       this.editedItem = this.shoppingListService.getIngredient(index);
    //       this.slForm.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount
    //       });
    //     }
    //   );
    this.subscription = this.shoppingListService.stratedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  onAddItem(form: NgForm) {
    // console.log(form);
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredients(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredients(newIngredient);
    }

    // console.log(form);
    // const ingredientName = this.nameInputRef.nativeElement.value;
    // console.log(ingredientName);
    // const ingredientAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    // this.ingredientAdded.emit(newIngredient);
    // this.shoppingListService.ingredientAdded.emit(newIngredient);
    // this.ingredientAdded.emit({nameInput: string, amountInput: string});
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
