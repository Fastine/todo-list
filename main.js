!function(t){var e={};function n(c){if(e[c])return e[c].exports;var s=e[c]={i:c,l:!1,exports:{}};return t[c].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=e,n.d=function(t,e,c){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:c})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var c=Object.create(null);if(n.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(c,s,function(e){return t[e]}.bind(null,s));return c},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);class c{constructor(t,e){this.name=t,this.color=e,this.tasks=[],this.complete=!1}addTask(t){this.tasks.push(t)}removeTask(t){this.tasks.splice(t,1)}completeProject(){0==this.complete?this.complete=!0:this.complete=!1}}class s{constructor(t,e,n,c){this.name=t,this.description=e,this.dueDate=n,this.priority=c,this.complete=!1}completeTask(){0==this.complete?this.complete=!0:this.complete=!1}}const r=(()=>{let t=[];const e=function(t,e,n,c,r){e=new s(e,n,c,r),t.addTask(e)};return{newTask:e,projects:t,newProject:function(e,n){e=new c(e,n),t.push(e)},newTask:e}})();n.d(e,"theDOM",(function(){return o}));const o=(()=>{document.querySelector("new-project-name"),document.querySelector("new-project-submit");const t=document.getElementById("project-list"),e=(document.querySelector("new-task-name"),document.querySelector("new-task-submit"),document.getElementById("task-list")),n=function(){r.projects.forEach((function(e,n){if(!Array.from(t.children)[n]){const c=document.createElement("li");c.className="project-card",c.setAttribute("project-id",n),c.style.border=`solid thin ${e.color}`,c.innerHTML=`<span class="card-title noselect ${e.color}"><input type="checkbox" class="checkbox">${e.name}</span>\n                <span class="card-description hidden">${e.description} <br>  <button class="btn edit">Edit</button> <button class="btn delete">Delete</button> </span>`,t.append(c)}}))},c=function(){if(a(),t.firstChild){let e=!1;const n=t.children;for(let t=0;t<n.length;t++){n[t].classList.contains("active-project")&&(e=!0)}0==e&&(t.firstChild.className+=" active-project")}const n=document.querySelector(".active-project").getAttribute("project-id");r.projects[`${n}`].tasks.forEach((function(t,n){const c=document.createElement("li");c.className="task-card",c.setAttribute("task-id",n),c.innerHTML=`<span class="card-title noselect"><input type="checkbox" class="checkbox">${t.name}</span>\n                        <span class="card-description hidden">${t.description} <br>  <button class="btn edit">Edit</button> <button class="btn delete">Delete</button> </span>\n                        `,e.append(c)}))},s=function(){const t=document.getElementById("new-project-name").value;console.log(t),r.newProject(t),n()},o=function(){const t=document.querySelector(".active-project").getAttribute("project-id"),e=document.getElementById("new-task-name").value;r.newTask(r.projects[`${t}`],e),c()},i=function(t){t.classList.toggle("complete")},a=function(){for(;e.firstChild;)e.removeChild(e.firstChild)};return{renderProjects:n,renderTasks:c,activateProject:function(t){const e=document.querySelector(".active-project");e.classList.remove("active-project"),console.log(e),a(),document.querySelector(`[project-id="${t}"]`).className+=" active-project",c()},projectList:t,submitNewProject:s,submitNewTask:o,initializeEventListeners:function(){document.getElementById("new-project-submit").addEventListener("click",s),document.getElementById("new-task-submit").addEventListener("click",o);const n=document.querySelector(".active-project"),c=n.getAttribute("project-id");n.querySelector(".card-description");t.addEventListener("click",(function(t){if(t.target.classList.contains("checkbox")){const e=t.target.parentElement.parentElement.getAttribute("project-id");r.projects[e].completeProject(),i(t.target.parentElement)}else{if(t.target.classList.contains("card-description"))return;t.target.classList.contains("project-card")?(t.target.classList.toggle("open"),t.target.querySelector(".card-description").classList.toggle("hidden")):t.target.classList.contains("card-title")?(t.target.parentElement.classList.toggle("open"),t.target.parentElement.querySelector(".card-description").classList.toggle("hidden")):console.log(t.target)}})),e.addEventListener("click",(function(t){if(t.target.classList.contains("checkbox")){const e=t.target.parentElement.parentElement.getAttribute("task-id");r.projects[c].tasks[e].completeTask(),i(t.target.parentElement)}else t.target.classList.contains("task-card")?(t.target.classList.toggle("open"),t.target.querySelector(".card-description").classList.toggle("hidden")):t.target.classList.contains("card-title")&&(t.target.parentElement.classList.toggle("open"),t.target.parentElement.querySelector(".card-description").classList.toggle("hidden"))}))},removeProjects:function(){for(;t.firstChild;)t.removeChild(t.firstChild)},removeTasks:a}})();r.newProject("default"),console.log(r.projects[0]),r.newProject("Shopping"),console.log(r.projects),r.newTask(r.projects[0],"test task 1"),r.newTask(r.projects[1],"this is it"),o.renderProjects(),o.renderTasks(),o.initializeEventListeners()}]);