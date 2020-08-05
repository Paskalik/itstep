import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  providers: [StorageService]
})
export class TodosComponent implements OnInit {

  todos: Todo[];
  newTodo: string;

  constructor(private storageService: StorageService){}

  ngOnInit(): void {
    this.todos = [];
    this.newTodo = '';
  }

  addTodo(event: Event): void {
    event.preventDefault();
    this.todos.push({
      todoName: this.newTodo,
      completed: false
    });
    this.storageService.addData(this.newTodo, false);
    this.newTodo = '';
  }

  deleteTodo(index: number): void {
    this.todos.splice(index++, 1);
    this.storageService.removeData(index++);
  }

  checkTodo(index: number, name: string, bool: boolean): void {
    if (!bool) {
      this.storageService.checkData(name, true, index++);
    } else {
      this.storageService.checkData(name, false, index++);
    }
  }

}
