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
                    `<span class="card-title noselect"><input type="checkbox" class="checkbox">${item.name}</span>
                <span class="card-description hidden">${item.description} <br>  <button class="btn edit">Edit</button> <button class="btn delete">Delete</button> </span>`;

                projectList.append(projectCard);
            }

        })

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
            taskList.style.backgroundColor = app.projects[`${activeProjectID}`].color;

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
        if (activeProject) {
            activeProject.style.backgroundColor = "white";
            activeProject.classList.remove('active-project');
        }
        // console.log(activeProject)


        // Clear current tasks
        removeTasks();

        // Activate new active project and render its tasks
        const activeProjectID = document.querySelector(`[project-id="${id}"]`)
        activeProjectID.className += ' active-project';
        activeProjectID.style.backgroundColor = app.projects[id].color;

        // Event.currentTarget.parentElement.className += ' active-project';  Use this later
        renderTasks();
    }

    const submitNewProject = function () {
        const projectName = document.getElementById("new-project-name").value;
        console.log(projectName);
        if (projectName == '') return; //Prevent blank projects from being created
        else {
            app.newProject(projectName);
            renderProjects();
        }
    }

    const submitNewTask = function () {
        const activeProjectID = document.querySelector('.active-project').getAttribute('project-id');
        const taskName = document.getElementById('new-task-name').value;
        if (taskName == '') return;
        else {
            app.newTask(app.projects[`${activeProjectID}`], taskName);
            renderTasks();
        }
    }

    const completeItem = function (item) {
        item.classList.toggle('complete');
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

    const updateProject = function (project, id) {
        const projectCard = document.querySelector(`[project-id="${id}"]`);
        projectCard.querySelector(".card-title").textContent = project.name;
        projectCard.querySelector(".card-description").textContent = project.description;

    }
    const updateTask = function (task, id) {
        const taskCard = document.querySelector(`[task-id="${id}"]`);
        taskCard.querySelector(".card-title").textContent = task.name;
        taskCard.querySelector(".card-description").textContent = task.description;

    }
    const initializeEventListeners = function () {
        document.getElementById('new-project-submit').addEventListener('click', theDOM.submitNewProject);
        document.getElementById('new-task-submit').addEventListener('click', submitNewTask);
        const activeProject = document.querySelector('.active-project');
        const activeProjectID = activeProject.getAttribute('project-id')
        const activeProjectDescription = activeProject.querySelector('.card-description')
        const modal = document.getElementById('modal');
        const editProjectForm = document.getElementById('edit-project');
        const editTaskForm = document.getElementById('edit-task');
        const modalClose = document.querySelector('.close');
        const editTaskName = document.getElementById('edit-task-name')
        const editTaskDescription = document.getElementById('edit-task-description');
        const editProjectName = document.getElementById('edit-project-name')
        const editProjectDescription = document.getElementById('edit-project-description');

        window.addEventListener("click", function (e) {
            if (e.target == modal) {
                modal.style.display = "none";
                editProjectForm.classList.toggle('hidden', true)
                editTaskForm.classList.toggle('hidden', true)
            };
        })

        modalClose.addEventListener('click', function () {
            modal.style.display = "none";
            editProjectForm.classList.toggle('hidden', true)
            editTaskForm.classList.toggle('hidden', true)
        })

        editProjectForm.addEventListener('click', function (e) {
            // Save button
            if (e.target.classList.contains('save')) {
                const currentProjectID = e.target.parentElement.getAttribute("edit-project-id");
                const currentProject = app.projects[currentProjectID]
                currentProject.editProject(editProjectName.value, editProjectDescription.value);
                console.log(currentProject);

                //close Modal
                modal.style.display = "none";
                editProjectForm.classList.toggle('hidden', true)
                editTaskForm.classList.toggle('hidden', true)

                updateProject(currentProject, currentProjectID);

            }
        })

        editTaskForm.addEventListener('click', function (e) {
            // Save button
            if (e.target.classList.contains('save')) {
                const activeProject = document.querySelector('.active-project')
                const activeProjectID = activeProject.getAttribute('project-id');
                const thisTaskID = e.target.parentElement.getAttribute("edit-task-id");
                const currentTask = app.projects[activeProjectID].tasks[thisTaskID]


                currentTask.editTask(editTaskName.value, editTaskDescription.value);

                //close Modal
                modal.style.display = "none";
                editProjectForm.classList.toggle('hidden', true)
                editTaskForm.classList.toggle('hidden', true)

                updateTask(currentTask, thisTaskID)

            }
        })

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
            // Expand project if active
            else if (e.target.classList.contains('project-card')) {
                if (e.target.classList.contains('active-project')) {
                    e.target.classList.toggle('open');
                    e.target.querySelector('.card-description').classList.toggle('hidden');
                    // Activate project if not
                } else activateProject(e.target.getAttribute('project-id'))

            } else if (e.target.classList.contains('card-title')) {
                if (e.target.parentElement.classList.contains('active-project')) {
                    e.target.parentElement.classList.toggle('open')
                    e.target.parentElement.querySelector('.card-description').classList.toggle('hidden')
                } else activateProject(e.target.parentElement.getAttribute('project-id'))

                // Edit button
            } else if (e.target.classList.contains('edit')) {
                if (e.target.parentElement.parentElement.classList.contains('project-card')) {
                    const projectID = e.target.parentElement.parentElement.getAttribute('project-id')
                    const project = app.projects[projectID];

                    // To reference the task being edited
                    editProjectForm.setAttribute("edit-project-id", projectID)

                    editProjectName.value = `${project.name}`;
                    editProjectDescription.value = `${project.description}`;

                    modal.style.display = "block";
                    editProjectForm.classList.toggle('hidden', false)
                }
            }

        })

        taskList.addEventListener('click', function (e) {
            const thisTaskID = e.target.parentElement.parentElement.getAttribute('task-id');
            const activeProjectID = document.querySelector('.active-project').getAttribute('project-id');
            if (e.target.classList.contains('checkbox')) {
                // Clicking an item's checkbox will set it to complete and strikethrough
                app.projects[activeProjectID].tasks[thisTaskID].completeTask();
                completeItem(e.target.parentElement);

                // Expand task
            } else if (e.target.classList.contains('task-card')) {
                e.target.classList.toggle('open');
                e.target.querySelector('.card-description').classList.toggle('hidden');
            } else if (e.target.classList.contains('card-title')) {
                e.target.parentElement.classList.toggle('open')
                e.target.parentElement.querySelector('.card-description').classList.toggle('hidden')

                // Edit Button
            } else if (e.target.classList.contains('edit')) {
                if (e.target.parentElement.parentElement.classList.contains('task-card')) {
                    const task = app.projects[activeProjectID].tasks[thisTaskID];

                    // To reference the task being edited
                    editTaskForm.setAttribute("edit-task-id", thisTaskID)

                    //Filling in form
                    editTaskName.value = `${task.name}`;
                    editTaskDescription.value = `${task.description}`;

                    //Showing form
                    modal.style.display = "block";
                    editTaskForm.classList.toggle('hidden', false)
                }
            }
        })

        document.querySelector("#new-project").addEventListener("submit", function (e) {

            e.preventDefault(); //stop form from submitting

        });
    }

    return {
        renderProjects,
        renderTasks,
        activateProject,
        projectList,
        submitNewProject,
        submitNewTask,
        removeProjects,
        removeTasks,
        initializeEventListeners
    }
})();



app.newProject("Notes", "#f50707", "This folder is for quick notes");
console.log(app.projects[0]);
app.newProject("Shopping", "#ffd900");
console.log(app.projects);
app.newTask(app.projects[0], "Pay rent", "$500");
app.newTask(app.projects[0], "Dinner at Fongs", "5:00pm");
app.newTask(app.projects[1], "Mahomes Magic Crunch");
app.newTask(app.projects[1], "Beer");


// app.newTask(app.projects[`${document.getAttribute('project-id')}`])



theDOM.renderProjects();
theDOM.activateProject(0);
theDOM.renderTasks();
theDOM.initializeEventListeners();


// theDOM.activateProject('0')
// theDOM.activateProject();