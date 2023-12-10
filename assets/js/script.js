//Definimos constantes y/o variables
const ingresarTarea = document.querySelector("input");
const addListTaks = document.querySelector("button");
const listaTareas = document.querySelector("#listaTareas");
const totalTareas = document.querySelector("#cuenta-tareas");
const tareasRealizadas = document.querySelector("#realizadas");

//Array de objetos predefinido que recibe objetos desde el input.
const tareas = [
  { id: 1, name: "Leer 20 páginas del libro", completed: false },
  { id: 2, name: "Ir al gimnasio al menos 45 minutos", completed: false },
  { id: 3, name: "Comer saludable durante el día", completed: false },
];

//Función para agregar tarea
const agregarTarea = () => {
  const tareaName = ingresarTarea.value.trim();
  if (!tareaName) {
    alert("Escribe tu tarea");
    return;
  }
  const ultimaTarea = tareas[tareas.length - 1];

  const nuevaTarea = {
    id: ultimaTarea ? ultimaTarea.id + 1 : 1,
    name: tareaName,
    completed: false,
  };
  tareas.push(nuevaTarea);
  ingresarTarea.value = "";
  renderList();
};

//Agrega la tarea a la lista
addListTaks.addEventListener("click", agregarTarea);

//Función que elimina tarea de la lista
const eliminarTarea = (id) => {
  const index = tareas.findIndex((tarea) => tarea.id === +id);
  tareas.splice(index, 1);
  renderList();
};

//Función que cambia es estado de la tarea
const addStatus = (id) => {
  const index = tareas.findIndex((tarea) => tarea.id === +id);
  tareas[index].completed = !tareas[index].completed;
  renderList();
};

//Función que guarda la tarea en una variable let, que se renderiza en el DOM
const renderList = () => {
  if (tareas.length === 0) {
    listaTareas.innerHTML =
      "<p class='text-center text-danger'>No hay tareas agregadas.</p>";
    totalTareas.textContent = "Total de tareas: 0";
    tareasRealizadas.textContent = "Tareas Completadas: 0";
    return;
  }

  let html = "";
  let tareasCompletadas = 0;
  tareas.forEach((tarea) => {
    html += `
    <div class = "d-flex justify-content-between align-items-center ${
      tarea.completed ? "text-info text-decoration: line-through" : ""
    }" style="margin-left: 10%">
           <p class="m-0 ${
             tarea.completed ? "text-decoration-line-through" : ""
           }">${tarea.id}</p>
           <p class="m-0 ${
             tarea.completed ? "text-decoration-line-through" : ""
           }">${tarea.name}</p>
              <h3 class="m-0">
              <i class="${
                tarea.completed
                  ? "fa-solid fa-rotate-left text-info"
                  : "fa-solid fa-check-circle text-success"
              }" onclick="addStatus('${tarea.id}')"></i>
                <i class="fa-solid fa-circle-minus text-danger" onclick="eliminarTarea('${
                  tarea.id
                }')"></i>
              </h3>
          </div>  
    `;
    if (tarea.completed) {
      tareasCompletadas++;
    }
  });

  listaTareas.innerHTML = html;
  totalTareas.textContent = `Total de tareas: ${tareas.length}`; //Renderiza el total de tareas en el DOM
  tareasRealizadas.textContent = `Tareas Completadas: ${tareasCompletadas}`; //Renderiza las tareas completadas en el DOM
};
renderList();
