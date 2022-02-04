import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs'

export const VarNameLocalStorage = {
  cart: 'ShoppingCartStorage',
  fav: 'favoriteStorage',
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private loadDataLocal = new BehaviorSubject<boolean>(false);

  loadDataLocal$ = this.loadDataLocal.asObservable();

  // guardar data en el localstorage
  setDataLocalStorage(itemName: string, data: any) {
    const parseData = JSON.stringify(data)
    localStorage.setItem(itemName, parseData);
  }
  
  // obtener data del localstorage
  getDataLocalStorage(itemName: string) {
    const data = localStorage.getItem(itemName);
    if (!data) {
      return null;
    } 
    const parseData = JSON.parse(data);
    return parseData;
  }

  // disparar llamado para cargar la data local de todos los servicios 
  loadData() {
    this.loadDataLocal.next(true);
  }
}