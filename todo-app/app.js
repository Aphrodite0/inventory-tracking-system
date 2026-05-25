// Task Manager with Local Storage
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Add task on Enter key
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
    }

    addTask(text = null, priority = 'medium') {
        const input = document.getElementById('taskInput');
        const taskText = text || input.value.trim();

        if (!taskText) {
            alert('Please enter a task');
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            priority: priority,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(task);
        this.save();
        input.value = '';
        this.render();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.save();
        this.render();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.save();
            this.render();
        }
    }

    filterTasks(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        this.render();
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'completed':
                return this.tasks.filter(t => t.completed);
            case 'pending':
                return this.tasks.filter(t => !t.completed);
            case 'high':
                return this.tasks.filter(t => t.priority === 'high');
            default:
                return this.tasks;
        }
    }

    save() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;

        document.getElementById('totalCount').textContent = total;
        document.getElementById('completedCount').textContent = completed;
        document.getElementById('pendingCount').textContent = pending;
    }

    render() {
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');
        const filteredTasks = this.getFilteredTasks();

        todoList.innerHTML = '';

        if (filteredTasks.length === 0) {
            emptyState.style.display = 'block';
            todoList.innerHTML = '';
            this.updateStats();
            return;
        }

        emptyState.style.display = 'none';

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `todo-item ${task.completed ? 'completed' : ''}`;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => this.toggleTask(task.id));

            const span = document.createElement('span');
            span.className = 'todo-text';
            span.textContent = task.text;

            const priorityBadge = document.createElement('span');
            priorityBadge.className = `priority ${task.priority}`;
            priorityBadge.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete';
            deleteBtn.textContent = '✕';
            deleteBtn.onclick = () => this.deleteTask(task.id);

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(priorityBadge);
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        });

        this.updateStats();
    }

    clearCompleted() {
        if (confirm('Clear all completed tasks?')) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.save();
            this.render();
        }
    }

    clearAll() {
        if (confirm('Clear all tasks? This cannot be undone.')) {
            this.tasks = [];
            this.currentFilter = 'all';
            this.save();
            this.render();
        }
    }
}

// Initialize the app
let taskManager;

document.addEventListener('DOMContentLoaded', () => {
    taskManager = new TaskManager();
});

// Global functions for HTML onclick handlers
function addTask() {
    taskManager.addTask();
}

function filterTasks(filter) {
    taskManager.filterTasks(filter);
}

function clearCompleted() {
    taskManager.clearCompleted();
}

function clearAll() {
    taskManager.clearAll();
}
