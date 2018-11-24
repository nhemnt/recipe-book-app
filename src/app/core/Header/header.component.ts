import {Component, EventEmitter, Output} from '@angular/core';
import {DataStoreageService} from '../../shared/data-storeage.service';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  // @Output() featureSelected = new EventEmitter<string>();

  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }
  constructor(private dataStorageService: DataStoreageService,
              private authService: AuthService,
              private router: Router) {
  }

  onSaveData() {
    this.dataStorageService.storeRecipe()
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
  }
  onGetData() {
    this.dataStorageService.getRecipe();
  }
  onLogout() {
    this.authService.signout();
    this.router.navigate(['/']);
  }
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
