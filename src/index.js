import { Project, Task } from "./classes.js";
import { app } from "./app.js";

app.newProject("project 1");
app.newProject("project 2");
// app.newTask(project, "task 1-1", "testdescription");
// console.log(project);
// app.newTask(project2, "task 2-1", "test description yoo");
// console.log(project2);
console.log(app.projects);
app.newTask(app.projects[0], "task 1-1");
app.newTask(app.projects[1], "task 2-1");

console.log(app.projects[0].tasks[0]);


// DOM Manipulation

const eventController = (() => {
    // Elements
    const newProjectName = document.querySelector("new-project-name");
    const newProjectSubmit = document.querySelector("new-project-submit");
    const projectList = document.getElementById("project-list")
    const newTaskName = document.querySelector("new-task-name");
    const newTaskSubmit = document.querySelector("new-task-submit");
    const taskList = document.getElementById("task-list")

    const render = function () {
        // Render each project in project space
        app.projects.forEach(item => {
            const projectCard = document.createElement("div");
            projectCard.className = 'project-card';

            projectCard.innerHTML =
                `<span>
            ${item.name}
            </span>`;

            projectList.append(projectCard)
        })

    }
    return {
        render
    }
})();

eventController.render();