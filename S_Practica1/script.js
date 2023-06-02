(function () {
	const todoList = document.querySelector('#todo-list');
	const userList = document.querySelector('#user-todo');
	const form = document.querySelector('form');
	let users = [];
	let todos = [];

	document.addEventListener('DOMContentLoaded', initApp);
	form.addEventListener('submit', handlerSubmit);

	function initApp() {
		Promise.all([getAllUsers(), getAllTodos()]).then((values) => {
			[users, todos] = values;
			todos.forEach((todo) => printTodo(todo));
			users.forEach((user) => createUser(user));
		});
	}

	function getUserName(userId) {
		const user = users.find((user) => user.id === userId);
		return user.name;
	}

	function printTodo({ id, userId, title, completed }) {
		const li = document.createElement('li');
		li.className = 'todo-item';
		li.dataset.id = id;
		li.innerHTML = `<span>${title} by <b class="user-accent">${getUserName(userId)}</b></span>`;
		todoList.prepend(li);
		const status = document.createElement('input');
		status.type = 'checkbox';
		status.checked = completed;
		status.addEventListener('change', handlerChangeCheckbox);
		li.prepend(status);

		const close = document.createElement('span');
		close.innerHTML = '&times;';
		close.className = 'close';
		close.addEventListener('click', handlerClose);
		li.append(close);
	}

	function createUser(user) {
		const option = document.createElement('option');
		option.innerText = user.name;
		option.value = user.id;
		userList.append(option);
	}

	function handlerSubmit(event) {
		event.preventDefault();
		createTodo({
			userId: +form.user.value,
			title: form.todo.value,
			completed: false,
		});
	}

	function handlerChangeCheckbox() {
		const todoId = this.parentElement.dataset.id;
		const completed = this.checked;
		setStatus(todoId, completed);
	}

	function handlerClose() {
		const todoId = this.parentElement.dataset.id;
		deletedTodo(todoId);
	}

	function removeTodo(todoId) {
		todos = todos.filter((todo) => todo.id !== todoId);
		const todo = todoList.querySelector('[data-id="' + todoId + '"]');
		todo
			.querySelector('input')
			.removeEventListener('change', handlerChangeCheckbox);
		todo.querySelector('.close').removeEventListener('click', handlerClose);
		todo.remove();
	}

	function alertError(error) {
		alert(error.message);
	}

	async function getAllUsers() {
		try {
			const response = await fetch(
				'https://jsonplaceholder.typicode.com/users'
			);
			const data = await response.json();
			return data;
		} catch (error) {
			alertError(error);
		}
	}

	async function getAllTodos() {
		try {
			const response = await fetch(
				'https://jsonplaceholder.typicode.com/todos'
			);
			const data = await response.json();
			return data;
		} catch (error) {
			alertError(error);
		}
	}

	async function createTodo(todo) {
		try {
			const response = await fetch(
				'https://jsonplaceholder.typicode.com/users',
				{
					method: 'POST',
					body: JSON.stringify(todo),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const newTodo = await response.json();
			printTodo(newTodo);
		} catch (error) {
			alertError(error);
		}
	}

	async function setStatus(todoId, completed) {
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos/${todoId}`,
				{
					method: 'PATCH',
					body: JSON.stringify({ completed: completed }),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				throw new Error('Какой то текст ошибки');
			}
		} catch (error) {
			alertError(error);
		}
	}

	async function deletedTodo(todoId) {
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos/${todoId}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			if (response.ok) {
				removeTodo(todoId);
			}
		} catch (error) {
			alertError(error);
		}
	}
})();
