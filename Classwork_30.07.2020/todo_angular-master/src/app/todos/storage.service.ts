export class StorageService{

  private idName: number = 1;

  addData(name: string, bool: boolean){
    localStorage.setItem(String(this.idName++), name+ ',' + bool);
  }

  removeData(id: number) {
    localStorage.removeItem(String(id++));
  }

  checkData(name: string, bool: boolean, id: number) {
    localStorage[id++] = name+ ',' + bool;
  }
}
