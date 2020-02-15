!function(t){var e={};function n(s){if(e[s])return e[s].exports;var c=e[s]={i:s,l:!1,exports:{}};return t[s].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var c in t)n.d(s,c,function(e){return t[e]}.bind(null,c));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);class s{constructor(t,e,n){this.name=t,this.color=e,this.description=n,this.tasks=[],this.complete=!1}addTask(t){this.tasks.push(t)}removeTask(t){this.tasks.splice(t,1)}completeProject(){0==this.complete?this.complete=!0:this.complete=!1}editProject(t,e){this.name=t,this.description=e}}class c{constructor(t,e,n,s){this.name=t,this.description=e,this.dueDate=n,this.priority=s,this.complete=!1}completeTask(){0==this.complete?this.complete=!0:this.complete=!1}editTask(t,e){this.name=t,this.description=e}}const o=(()=>{let t=[];const e=function(t,e,n,s,o){e=new c(e,n,s,o),t.addTask(e)};return{newTask:e,projects:t,newProject:function(e,n,c){e=new s(e,n,c),t.push(e)},newTask:e}})();n.d(e,"theDOM",(function(){return r}));const r=(()=>{document.querySelector("new-project-name"),document.querySelector("new-project-submit");const t=document.getElementById("project-list"),e=(document.querySelector("new-task-name"),document.querySelector("new-task-submit"),document.getElementById("task-list")),n=function(){o.projects.forEach((function(e,n){if(!Array.from(t.children)[n]){const s=document.createElement("li");s.className="project-card",s.setAttribute("project-id",n),s.style.border=`solid thin ${e.color}`,s.innerHTML=`<span class="card-title noselect"><input type="checkbox" class="checkbox">${e.name}</span>\n                <span class="card-description hidden">${e.description} <br>  <button class="btn edit">Edit</button> <button class="btn delete">Delete</button> </span>`,t.append(s)}}))},s=function(){if(l(),t.firstChild){let e=!1;const n=t.children;for(let t=0;t<n.length;t++){n[t].classList.contains("active-project")&&(e=!0)}0==e&&(t.firstChild.className+=" active-project")}const n=document.querySelector(".active-project").getAttribute("project-id");o.projects[`${n}`].tasks.forEach((function(t,s){const c=document.createElement("li");c.className="task-card",c.setAttribute("task-id",s),e.style.backgroundColor=o.projects[`${n}`].color,c.innerHTML=`<span class="card-title noselect"><input type="checkbox" class="checkbox">${t.name}</span>\n                        <span class="card-description hidden">${t.description} <br>  <button class="btn edit">Edit</button> <button class="btn delete">Delete</button> </span>\n                        `,e.append(c)}))},c=function(t){const e=document.querySelector(".active-project");e&&(e.style.backgroundColor="white",e.classList.remove("active-project")),l();const n=document.querySelector(`[project-id="${t}"]`);n.className+=" active-project",n.style.backgroundColor=o.projects[t].color,s()},i=function(){const t=document.querySelector(".active-project").getAttribute("project-id"),e=document.getElementById("new-task-name").value;""!=e&&(o.newTask(o.projects[`${t}`],e),s())},a=function(t){t.classList.toggle("complete")},l=function(){for(;e.firstChild;)e.removeChild(e.firstChild)};return{renderProjects:n,renderTasks:s,activateProject:c,projectList:t,submitNewProject:function(){const t=document.getElementById("new-project-name").value;console.log(t),""!=t&&(o.newProject(t),n())},submitNewTask:i,removeProjects:function(){for(;t.firstChild;)t.removeChild(t.firstChild)},removeTasks:l,initializeEventListeners:function(){document.getElementById("new-project-submit").addEventListener("click",r.submitNewProject),document.getElementById("new-task-submit").addEventListener("click",i);const n=document.querySelector(".active-project"),s=(n.getAttribute("project-id"),n.querySelector(".card-description"),document.getElementById("modal")),l=document.getElementById("edit-project"),d=document.getElementById("edit-task"),u=document.querySelector(".close"),p=document.getElementById("edit-task-name"),m=document.getElementById("edit-task-description"),g=document.getElementById("edit-project-name"),f=document.getElementById("edit-project-description");window.addEventListener("click",(function(t){t.target==s&&(s.style.display="none",l.classList.toggle("hidden",!0),d.classList.toggle("hidden",!0))})),u.addEventListener("click",(function(){s.style.display="none",l.classList.toggle("hidden",!0),d.classList.toggle("hidden",!0)})),l.addEventListener("click",(function(t){if(t.target.classList.contains("save")){const e=t.target.parentElement.getAttribute("edit-project-id"),n=o.projects[e];n.editProject(g.value,f.value),console.log(n),s.style.display="none",l.classList.toggle("hidden",!0),d.classList.toggle("hidden",!0),function(t,e){const n=document.querySelector(`[project-id="${e}"]`);n.querySelector(".card-title").textContent=t.name,n.querySelector(".card-description").textContent=t.description}(n,e)}})),d.addEventListener("click",(function(t){if(t.target.classList.contains("save")){const e=document.querySelector(".active-project").getAttribute("project-id"),n=t.target.parentElement.getAttribute("edit-task-id"),c=o.projects[e].tasks[n];c.editTask(p.value,m.value),s.style.display="none",l.classList.toggle("hidden",!0),d.classList.toggle("hidden",!0),function(t,e){const n=document.querySelector(`[task-id="${e}"]`);n.querySelector(".card-title").textContent=t.name,n.querySelector(".card-description").textContent=t.description}(c,n)}})),t.addEventListener("click",(function(t){if(t.target.classList.contains("checkbox")){const e=t.target.parentElement.parentElement.getAttribute("project-id");o.projects[e].completeProject(),a(t.target.parentElement)}else{if(t.target.classList.contains("card-description"))return;if(t.target.classList.contains("project-card"))t.target.classList.contains("active-project")?(t.target.classList.toggle("open"),t.target.querySelector(".card-description").classList.toggle("hidden")):c(t.target.getAttribute("project-id"));else if(t.target.classList.contains("card-title"))t.target.parentElement.classList.contains("active-project")?(t.target.parentElement.classList.toggle("open"),t.target.parentElement.querySelector(".card-description").classList.toggle("hidden")):c(t.target.parentElement.getAttribute("project-id"));else if(t.target.classList.contains("edit")&&t.target.parentElement.parentElement.classList.contains("project-card")){const e=t.target.parentElement.parentElement.getAttribute("project-id"),n=o.projects[e];l.setAttribute("edit-project-id",e),g.value=`${n.name}`,f.value=`${n.description}`,s.style.display="block",l.classList.toggle("hidden",!1)}}})),e.addEventListener("click",(function(t){const e=t.target.parentElement.parentElement.getAttribute("task-id"),n=document.querySelector(".active-project").getAttribute("project-id");if(t.target.classList.contains("checkbox"))o.projects[n].tasks[e].completeTask(),a(t.target.parentElement);else if(t.target.classList.contains("task-card"))t.target.classList.toggle("open"),t.target.querySelector(".card-description").classList.toggle("hidden");else if(t.target.classList.contains("card-title"))t.target.parentElement.classList.toggle("open"),t.target.parentElement.querySelector(".card-description").classList.toggle("hidden");else if(t.target.classList.contains("edit")&&t.target.parentElement.parentElement.classList.contains("task-card")){const t=o.projects[n].tasks[e];d.setAttribute("edit-task-id",e),p.value=`${t.name}`,m.value=`${t.description}`,s.style.display="block",d.classList.toggle("hidden",!1)}})),document.querySelector("#new-project").addEventListener("submit",(function(t){t.preventDefault()}))}}})();o.newProject("Notes","#f50707","This folder is for quick notes"),console.log(o.projects[0]),o.newProject("Shopping","#ffd900"),console.log(o.projects),o.newTask(o.projects[0],"Pay rent","$500"),o.newTask(o.projects[0],"Dinner at Fongs","5:00pm"),o.newTask(o.projects[1],"Mahomes Magic Crunch"),o.newTask(o.projects[1],"Beer"),r.renderProjects(),r.activateProject(0),r.renderTasks(),r.initializeEventListeners()}]);