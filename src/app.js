import {
  Task,
  Project
} from "./classes.js";

// App Functions
export const app = (() => {
  //Home for all project folders
  let projects = [];

  //Create Project
  const newProject = function (name, color, description) {
    name = new Project(name, color, description);
    projects.push(name);
  };

  //Create Item
  const newTask = function (project, name, description, dueDate, priority) {
    name = new Task(name, description, dueDate, priority);
    project.addTask(name);
  };

  //Remove Project
  const removeProject = function (index) {
    projects.splice(index, 1)
    console.log(projects)
  }

  return {
    newTask,
    projects,
    newProject,
    newTask,
    removeProject
  };
})();