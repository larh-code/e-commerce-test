import {
  Component,
  OnInit
} from '@angular/core'

import { LocalStorageService } from './shared/services/localStorage.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.loadDataLocalStorage();
  }

  // cargar la data del localstorage al iniciar la app
  loadDataLocalStorage() {
    this.localStorageService.loadData();
  }
}
