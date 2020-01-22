import {
    Project,
    Task
} from "./classes.js";
import {
    app
} from "./app.js";

// app.newProject("default");
// console.log(app.projects[0])
// app.newTask("default", "task 1-1", "testdescription");
// app.newProject("Here we go");
// app.newTask(project2)
// console.log(project);
// app.newTask(project2, "task 2-1", "test description yoo");
// console.log(project2);
// console.log(app.projects);
// app.newTask(app.projects[0], "task 1-1");
// app.newTask(app.projects[0], "task 1-2");

// console.log(app.projects[0].tasks[0]);


// DOM Manipulation

export const theDOM = (() => {
    // Elements
    const newProjectName = document.querySelector("new-project-name");
    const newProjectSubmit = document.querySelector("new-project-submit");
    const projectList = document.getElementById("project-list");
    const newTaskName = document.querySelector("new-task-name");
    const newTaskSubmit = document.querySelector("new-task-submit");
    const taskList = document.getElementById("task-list");

    const renderProjects = function () {
        // Render each project in project space
        app.projects.forEach(function (item, index) {
            const projectCard = document.createElement("div");
            projectCard.className = 'project-card';
            projectCard.setAttribute("project-id", index)

            projectCard.innerHTML =
                `<span class="card-title ${item.color}">${item.name}</span>
                <span class="card-description hidden">${item.description}</span>`;

            projectList.append(projectCard);
        })

    }

    const renderTasks = function () {
        // Check for selected project. If none, select first in list
        if (theDOM.projectList.firstChild) {
            let active = false;
            const children = theDOM.projectList.children;

            for (i = 0; i < children.length; i++) {
                let child = children[i];
                if (child.classList.includes('.active-project')) active = true;
            }
            if (active == false) theDOM.projectList.firstChild.className += ' active-project';
        }


        // Grab currently selected project and render its tasks
        const activeProject = document.querySelector('.active-project').getAttribute('project-id');
        const currentTasks = app.projects[`${activeProject}`].tasks;


        currentTasks.forEach(function (item, index) {
            const taskCard = document.createElement("div");
            taskCard.className = 'task-card';
            taskCard.setAttribute("task-id", index)

            taskCard.innerHTML =
                `<span class="card-title">${item.name}</span>
                        <span class="card-description hidden">${item.description}</span>
                        `
            theDOM.taskList.append(taskCard)
        })
    }

    const activateProject = function (id) {
        // Deactivate current active project
        const deactivatingProject = document.querySelector('.active-project');
        deactivatingProject.classList.remove('active-project');


        // Remove all tasks from DOM
        while (theDOM.taskList.firstChild) {
            theDOM.taskList.removeChild(firstChild);
        }

        // Activate new active project and render its tasks
        const activeProject = document.querySelector(`[project-id="${id}"]`)
        activeProject.className += ' active-project'

        // Event.target.parentElement.className += ' active-project';  Use this later
        theDOM.renderTasks();


    }

    return {
        renderProjects,
        renderTasks,
        activateProject
    }
})();



app.newProject("default");
console.log(app.projects[0])
app.newProject("Shopping");
console.log(app.projects);
app.newTask(app.projects[0], "test task 1")
console.log(theDOM.projectList)

// app.newTask(app.projects[`${document.getAttribute('project-id')}`])



theDOM.renderProjects();
theDOM.renderTasks();

// theDOM.activateProject('0')
// theDOM.activateProject();