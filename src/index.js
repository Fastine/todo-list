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
                projectCard.style.border = `solid thin ${item.color}`

                projectCard.innerHTML =
                    `<span class="card-title noselect ${item.color}"><input type="checkbox" class="checkbox">${item.name}</span>
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
            taskCard.setAttribute("task-id", index);

            taskCard.innerHTML =
                `<span class="card-title noselect"><input type="checkbox" class="checkbox">${item.name}</span>
                        <span class="card-description hidden">${item.description} <br>  <button class="btn edit">Edit</button> <button class="btn delete">Delete</button> </span>
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

        // Event.currentTarget.parentElement.className += ' active-project';  Use this later
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

    const completeItem = function (item) {
        item.classList.toggle('complete');
    }

    const initializeEventListeners = function () {
        document.getElementById('new-project-submit').addEventListener('click', submitNewProject);
        document.getElementById('new-task-submit').addEventListener('click', submitNewTask);
        const activeProject = document.querySelector('.active-project');
        const activeProjectID = activeProject.getAttribute('project-id')
        const activeProjectDescription = activeProject.querySelector('.card-description')

        projectList.addEventListener('click', function (e) {
            // Checkbox
            if (e.target.classList.contains('checkbox')) {
                // Clicking an item's checkbox will set it to complete and strikethrough
                const thisProjectID = e.target.parentElement.parentElement.getAttribute('project-id');
                app.projects[thisProjectID].completeProject();
                completeItem(e.target.parentElement);
            } // Prevent events in card description area
            else if (e.target.classList.contains('card-description')) {
                return;
            }
            // Expand
            else if (e.target.classList.contains('project-card')) {
                e.target.classList.toggle('open');
                e.target.querySelector('.card-description').classList.toggle('hidden');
            } else if (e.target.classList.contains('card-title')) {
                e.target.parentElement.classList.toggle('open')
                e.target.parentElement.querySelector('.card-description').classList.toggle('hidden')
            } else {
                console.log(e.target)
            }


            // If currentTarget isn't active, switches the active project to currentTarget
            // if ((e.currentTarget == activeProject ||
            //         (e.currentTarget.classList.contains('card-title') && e.currentTarget.parentElement == activeProject))) {
            //     activeProjectDescription.classList.toggle('hidden');
            //     activeProject.classList.toggle('open');
            //     console.log(activeProjectDescription);
            // } else {
            //     if (!activeProjectDescription.classList.contains('hidden')) activeProjectDescription.classList.toggle('hidden')
            //     activeProject.classList.toggle('open');
            //     activeProject.classList.toggle('active-project');
            //     e.currentTarget.classList.contains('project-card') == true ? e.currentTarget.classList.toggle('active-project') : e.currentTarget.parentElement.classList.toggle('active-project');
            //     renderTasks();
            // }


        })
        taskList.addEventListener('click', function (e) {
            if (e.target.classList.contains('checkbox')) {
                // Clicking an item's checkbox will set it to complete and strikethrough
                const thisTaskID = e.target.parentElement.parentElement.getAttribute('task-id');
                app.projects[activeProjectID].tasks[thisTaskID].completeTask();
                completeItem(e.target.parentElement);

            } else if (e.target.classList.contains('task-card')) {
                e.target.classList.toggle('open');
                e.target.querySelector('.card-description').classList.toggle('hidden');
            } else if (e.target.classList.contains('card-title')) {
                e.target.parentElement.classList.toggle('open')
                e.target.parentElement.querySelector('.card-description').classList.toggle('hidden')
            }
        })
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