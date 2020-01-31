import {
  theDOM
} from ".";

export class Project {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.tasks = [];
    this.complete = false;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(index) {
    this.tasks.splice(index, 1)
  }

  completeProject() {
    this.complete == false ? this.complete = true : this.complete = false;
  }

}

export class Task {
  //Items that are added to a project
  constructor(name, description, dueDate, priority) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
  }

  completeTask() {
    this.complete == false ? this.complete = true : this.complete = false;
  }

}