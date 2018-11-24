import {Recipe} from './recipe.model';
import {Subject} from 'rxjs/index';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Aaloo Ke Paranthe',
      'Mummy ko sdj',
      'https://picsum.photos/200/202',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Fries', 20)
      ]),
    new Recipe('Aaloo Ke Paranthe',
      'aalloo pyaz k paranthe',
      'https://picsum.photos/200/203',
      [
        new Ingredient('Potatao', 1),
        new Ingredient('onion', 2)
      ]),
    new Recipe('Aaloo Ke Paranthe',
      'Mummy ko sdj',
      'https://picsum.photos/200/201',
      [
        new Ingredient('gobi', 1),
        new Ingredient('oninon', 20)
      ]),
    new Recipe('maggie',
      'me or meri maggie',
      'https://picsum.photos/200/200',
      [
        new Ingredient('maggie', 1),
        new Ingredient('maggie masala', 3)
      ])
  ];

  constructor(private slService: ShoppingListService) {
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredientsFromShoppingList(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
