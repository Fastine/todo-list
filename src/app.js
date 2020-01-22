import {
  Task,
  Project
} from "./classes.js";

// App Functions
export const app = (() => {
  //Home for all project folders
  let projects = [];

  //Create Project
  const newProject = function (name, color) {
    name = new Project(name, color);
    projects.push(name);
  };

  //Create Item
  const newTask = function (project, name, description, dueDate, priority) {
    name = new Task(name, description, dueDate, priority);
    project.addTask(name);
  };

  return {
    newTask,
    projects,
    newProject,
    newTask
  };
})();