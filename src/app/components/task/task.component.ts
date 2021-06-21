import { Task } from '../../interfaces/Task';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
 
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() newTask : boolean = false;
  @Input() editmode : boolean = false;
  @Input() task : Task = { complete: false, title: '' };

  @Output() create: EventEmitter<Task> = new EventEmitter();
  @Output() delete: EventEmitter<Task> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  checkKey(event : any){
    if (event.keyCode == 13) this.saveTask();
  }

  saveTask(){
    if (this.newTask == true) this.emitCreateTask();
    this.editmode = false;
  }

  markComplete() {
    if (this.task.complete == false) {
      this.task.complete = true;
    }
  }

  emitDeleteTask() {
    this.delete.emit(this.task);
  }

  emitCreateTask() {
    this.create.emit(this.task)
  }
}
