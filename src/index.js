import {
    Project,
    Task
} from "./classes.js";
import {
    app
} from "./app.js";


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
        //Clear current projects
        // removeProjects();
        // Render each project in project space
        app.projects.forEach(function (item, index) {
            const children = Array.from(projectList.children);
            if (!children[index]) {
                const projectCard = document.createElement("li");
                projectCard.className = 'project-card';
                projectCard.setAttribute("project-id", index)

                projectCard.innerHTML =
                    `<input type="checkbox" class="checkbox"><span class="card-title ${item.color}">${item.name}</span>
                <span class="card-description hidden">${item.description} <br>  <button class="btn edit">Edit</button> <button class="btn delete">Delete</button> </span>`;

                projectList.append(projectCard);
            }

        })

    }

    const renderNewProject = function () {
        let newProject = app.projects[-1];

    }

    const renderTasks = function () {
        //Clear current tasks
        removeTasks();
        // Check for selected project. If none, select first in list
        if (projectList.firstChild) {
            let active = false;
            const children = projectList.children;

            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                if (child.classList.contains('active-project')) active = true;
            }
            if (active == false) projectList.firstChild.className += ' active-project';
        }



        // Grab currently selected project and render its tasks
        const activeProjectID = document.querySelector('.active-project').getAttribute('project-id');
        const currentTasks = app.projects[`${activeProjectID}`].tasks;


        currentTasks.forEach(function (item, index) {
            const taskCard = document.createElement("li");
            taskCard.className = 'task-card';
            taskCard.setAttribute("task-id", index)

            taskCard.innerHTML =
                `<span class="card-title">${item.name}</span>
                        <span class="card-description hidden">${item.description}</span>
                        `
            taskList.append(taskCard)
        })
    }

    const activateProject = function (id) {
        // Deactivate current active project
        const activeProject = document.querySelector('.active-project');
        activeProject.classList.remove('active-project');
        console.log(activeProject)


        // Clear current tasks
        removeTasks();

        // Activate new active project and render its tasks
        const activeProjectID = document.querySelector(`[project-id="${id}"]`)
        activeProjectID.className += ' active-project'

        // Event.target.parentElement.className += ' active-project';  Use this later
        renderTasks();
    }

    const submitNewProject = function () {
        const projectName = document.getElementById("new-project-name").value;
        console.log(projectName);
        app.newProject(projectName);
        renderProjects();
    }

    const submitNewTask = function () {
        const activeProjectID = document.querySelector('.active-project').getAttribute('project-id');
        const taskName = document.getElementById('new-task-name').value;
        app.newTask(app.projects[`${activeProjectID}`], taskName);
        renderTasks();
    }

    const initializeEventListeners = function () {
        document.getElementById('new-project-submit').addEventListener('click', submitNewProject);
        document.getElementById('new-task-submit').addEventListener('click', submitNewTask);

        projectList.addEventListener('click', function (e) {
            const li = e.target.parentElement;
            const activeProject = document.querySelector('.active-project');

            // If target isn't active, switches the active project to target
            if ((e.target == activeProject || e.target.parentElement == activeProject)) {
                return; //expand function later??
            } else {
                activeProject.classList.toggle('active-project');
                e.target.classList.contains('project-card') == true ? e.target.classList.toggle('active-project') : e.target.parentElement.classList.toggle('active-project');
                renderTasks();
            }
            //if (li.classList.contains('project-card') == true) {
            //     // If card is clicked, it is activated
            //     console.log(li);
            //     activeProject.classList.toggle('active-project');
            //     li.classList.toggle('active-project');
            //     renderTasks();
            // }
        })





        //   ul.addEventListener('click', function(e) {

        //  if(e.target.className == 'something'){
        // const li = e.target.parentElement;
        // ul.dosomething
        // }})
    }

    const removeTasks = function () {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }

    const removeProjects = function () {
        while (projectList.firstChild) {
            projectList.removeChild(projectList.firstChild);
        }
    }

    return {
        renderProjects,
        renderTasks,
        activateProject,
        projectList,
        submitNewProject,
        submitNewTask,
        initializeEventListeners,
        removeProjects,
        removeTasks
    }
})();



app.newProject("default");
console.log(app.projects[0]);
app.newProject("Shopping");
console.log(app.projects);
app.newTask(app.projects[0], "test task 1");
app.newTask(app.projects[1], "this is it");


// app.newTask(app.projects[`${document.getAttribute('project-id')}`])



theDOM.renderProjects();
theDOM.renderTasks();
theDOM.initializeEventListeners();


// theDOM.activateProject('0')
// theDOM.activateProject();