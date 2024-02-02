//todo------------------------------- Seciciler-----------------------------------------
const todoBtn = document.getElementById("todo-button");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-ul");

let todoArr = JSON.parse(localStorage.getItem("todoLoc")) || []; //1-localden diziye cevirerek al.2-todoArr dizisini localstoragede verielrle güncellerken eger todoArr bulunmazsa bos array atamasi yap
console.log(todoArr);
//todo ---------------localdan gelen array i domdan okuyup ekrana basmak icin----------------
const renderTodos = () => {
	todoArr.forEach((todo) => {
		createTodoElement(todo);
	});
};
renderTodos();

//todo ---------------------------Butona tiklandiginda----------------------------------
todoBtn.addEventListener("click", () => {
	if (todoInput.value) {
		//gelen veriyi object ye ceviriyoruz.
		const newTodo = {
			id: new Date().getTime(),
			text: todoInput.value,
			completed: false,
		};
		createTodoElement(newTodo);

		todoArr.push(newTodo);
		localStorage.setItem("todoLoc", JSON.stringify(todoArr)); //stringe cevirip locale gönder
		console.log(todoArr);

		todoInput.value = "";
	}
});

//todo ----------Elementleri bir fonksiyon icinde olusturalim----------------------------

function createTodoElement(newTodo) {
	const li = document.createElement("li");
	li.setAttribute("id", newTodo.id);
	newTodo.completed && li.classList.add("checked");

	const tikIcon = document.createElement("i");
	tikIcon.setAttribute("class", "fas fa-check");
	li.appendChild(tikIcon);

	const p = document.createElement("p");
	const pTextNode = document.createTextNode(newTodo.text);
	p.appendChild(pTextNode);
	li.appendChild(p);

	const deleteIcon = document.createElement("i");
	deleteIcon.setAttribute("class", "fas fa-trash");
	li.appendChild(deleteIcon);

	todoUl.appendChild(li);
}

//todo--------------Capturing---------------------
todoUl.addEventListener("click", (e) => {
	console.log(e.target);
	const id = e.target.parentElement.getAttribute("id"); //parent elementteki id yi okuyoruz.

	if (e.target.classList.contains("fa-check")) {
		e.target.parentElement.classList.toggle("checked");

		const todoIndex = todoArr.findIndex((todo) => todo.id === Number(id));
		if (todoIndex !== -1) {
			todoArr[todoIndex].completed = !todoArr[todoIndex].completed;

			localStorage.setItem("todoLoc", JSON.stringify(todoArr));
		}
	}
	if (e.target.classList.contains("fa-trash")) {
		e.target.parentElement.remove();

		todoArr = todoArr.filter((todo) => todo.id !== Number(id)); //id si olmayanlari alip tekrar ayni diziyi yeni haliyle olusturuyoruz.
		localStorage.setItem("todoLoc", JSON.stringify(todoArr)); //tekrar dizinin yeni halini local a gönder
	}
});

//?Enter a basilinca todoBtn un click metodunu calistir!
todoInput.addEventListener("keydown", (e) => {
	if (e.code === "Enter") {
		todoBtn.click();
	}
});

//?Baslangicta input aktif olsun!
window.onload = function () {
	todoInput.focus();
};
