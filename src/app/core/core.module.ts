import {NgModule} from '@angular/core';
import {HeaderComponent} from './Header/header.component';
import {HomeComponent} from './home/home.component';
import {ShareModule} from '../shared/share.module';
import {AppRoutingModule} from '../app-routing.module';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {DataStoreageService} from '../shared/data-storeage.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    ShareModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    DataStoreageService,
    AuthService
  ]
})
export class CoreModule {}
