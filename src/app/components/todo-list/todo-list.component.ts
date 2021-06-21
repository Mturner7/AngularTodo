import {Task} from '../../interfaces/Task';
import {TaskList} from '../../data/tasklist';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  state : boolean = false;
  adding : boolean = false;

  tasks : Array<Task> = TaskList; //local reference of tasklist
  filteredTasks : Array<Task> = Object.assign([], this.tasks);

  constructor() { }

  ngOnInit(): void {
  }

  copyTasks(){
    this.filteredTasks = Object.assign([], this.tasks);
  }

  createTask(newTask : Task): void {
    this.tasks.splice(0, 0, newTask);
    this.adding = false;
    this.copyTasks();
  }

  //search function
  filterTasks(event : any): void {
    let query : string = event.target.value;
    query = query.replace(/^\s+|\s+$/g, "").toLowerCase(); //deletes leading or trailing whitespace  
    
    if (!query) { //nothing is typed (no input)
      this.copyTasks(); 
    }
    else {
      this.filteredTasks = Object.assign([], this.tasks).filter( (task: any) => task.title.toLowerCase().includes(query) );
    }
}

  deleteTask(oldTask : Task): void {
    this.tasks = this.tasks.filter( task => task != oldTask );
    this.copyTasks();
  }
}
