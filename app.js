// ========================================
// Configuration
// ========================================

const API_BASE_URL = 'http://localhost:8000';
const API_ENDPOINTS = {
    todos: `${API_BASE_URL}/todos`,
};

// ========================================
// State Management
// ========================================

let todos = [];
let currentFilter = 'all';
let editingTodoId = null;

// ========================================
// DOM Elements
// ========================================

const DOM = {
    form: document.getElementById('createTodoForm'),
    titleInput: document.getElementById('todoTitle'),
    descriptionInput: document.getElementById('todoDescription'),
    container: document.getElementById('todosContainer'),
    emptyState: document.getElementById('emptyState'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    modal: document.getElementById('editModal'),
    editForm: document.getElementById('editTodoForm'),
    editTitle: document.getElementById('editTitle'),
    editDescription: document.getElementById('editDescription'),
    closeModal: document.getElementById('closeModal'),
    cancelEdit: document.getElementById('cancelEdit'),
    toast: document.getElementById('toast'),
    totalCount: document.getElementById('totalCount'),
    activeCount: document.getElementById('activeCount'),
    completedCount: document.getElementById('completedCount'),
};

// ========================================
// Utility Functions
// ========================================

/**
 * Shows a toast notification
 */
function showToast(message, type = 'info') {
    DOM.toast.textContent = message;
    DOM.toast.className = `toast ${type}`;
    DOM.toast.style.display = 'block';
    
    setTimeout(() => {
        DOM.toast.style.display = 'none';
    }, 3000);
}

/**
 * Formats a date to readable format
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return `Hoy a las ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
        return 'Ayer';
    } else if (diffDays < 7) {
        return `Hace ${diffDays} días`;
    } else {
        return date.toLocaleDateString('es-ES');
    }
}

/**
 * Updates statistics
 */
function updateStats() {
    const total = todos.length;
    const active = todos.filter(t => !t.completed).length;
    const completed = todos.filter(t => t.completed).length;

    DOM.totalCount.textContent = `Total: ${total}`;
    DOM.activeCount.textContent = `Pendientes: ${active}`;
    DOM.completedCount.textContent = `Completadas: ${completed}`;
}

/**
 * Filters todos based on current filter
 */
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

/**
 * Opens the edit modal
 */
function openEditModal(todoId) {
    const todo = todos.find(t => t.id === todoId);
    if (!todo) return;

    editingTodoId = todoId;
    DOM.editTitle.value = todo.title;
    DOM.editDescription.value = todo.description || '';
    DOM.modal.style.display = 'flex';
}

/**
 * Closes the edit modal
 */
function closeEditModal() {
    DOM.modal.style.display = 'none';
    editingTodoId = null;
    DOM.editTitle.value = '';
    DOM.editDescription.value = '';
}

// ========================================
// API Functions
// ========================================

/**
 * Fetch all todos from the API
 */
async function fetchTodos() {
    try {
        const response = await fetch(API_ENDPOINTS.todos);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        todos = await response.json();
        updateStats();
        renderTodos();
    } catch (error) {
        console.error('Error fetching todos:', error);
        showToast('Error al cargar las tareas', 'error');
        DOM.container.innerHTML = '<div class="loading-state"><p>Error al cargar las tareas</p></div>';
    }
}

/**
 * Create a new todo
 */
async function createTodo(title, description) {
    try {
        const response = await fetch(API_ENDPOINTS.todos, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description: description || null,
            }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const newTodo = await response.json();
        todos.push(newTodo);
        
        updateStats();
        renderTodos();
        DOM.form.reset();
        showToast('Tarea creada exitosamente', 'success');
    } catch (error) {
        console.error('Error creating todo:', error);
        showToast('Error al crear la tarea', 'error');
    }
}

/**
 * Update a todo
 */
async function updateTodo(id, updates) {
    try {
        const response = await fetch(`${API_ENDPOINTS.todos}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const updatedTodo = await response.json();
        const index = todos.findIndex(t => t.id === id);
        if (index !== -1) {
            todos[index] = updatedTodo;
        }

        updateStats();
        renderTodos();
        showToast('Tarea actualizada exitosamente', 'success');
    } catch (error) {
        console.error('Error updating todo:', error);
        showToast('Error al actualizar la tarea', 'error');
    }
}

/**
 * Delete a todo
 */
async function deleteTodo(id) {
    try {
        const response = await fetch(`${API_ENDPOINTS.todos}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        todos = todos.filter(t => t.id !== id);
        updateStats();
        renderTodos();
        showToast('Tarea eliminada exitosamente', 'success');
    } catch (error) {
        console.error('Error deleting todo:', error);
        showToast('Error al eliminar la tarea', 'error');
    }
}

// ========================================
// Rendering Functions
// ========================================

/**
 * Renders the todo list
 */
function renderTodos() {
    const filteredTodos = getFilteredTodos();

    if (filteredTodos.length === 0) {
        DOM.container.style.display = 'none';
        DOM.emptyState.style.display = 'block';
        return;
    }

    DOM.container.style.display = 'grid';
    DOM.emptyState.style.display = 'none';

    DOM.container.innerHTML = filteredTodos.map(todo => createTodoCard(todo)).join('');
    attachTodoCardListeners();
}

/**
 * Creates HTML for a todo card
 */
function createTodoCard(todo) {
    const statusClass = todo.completed ? 'completed' : 'pending';
    const statusText = todo.completed ? 'Completada' : 'Pendiente';
    const cardClass = todo.completed ? 'completed' : '';

    return `
        <div class="todo-card ${cardClass}" data-todo-id="${todo.id}">
            <div class="todo-header">
                <input 
                    type="checkbox" 
                    class="todo-checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    data-action="toggle-complete"
                    data-todo-id="${todo.id}"
                >
                <div class="todo-content">
                    <h3 class="todo-title">${escapeHtml(todo.title)}</h3>
                    ${todo.description ? `<p class="todo-description">${escapeHtml(todo.description)}</p>` : ''}
                </div>
            </div>

            <div class="todo-meta">
                <span class="todo-date">${formatDate(todo.created_at)}</span>
                <span class="todo-status ${statusClass}">${statusText}</span>
            </div>

            <div class="todo-actions">
                <button class="btn btn-secondary btn-sm" data-action="edit-todo" data-todo-id="${todo.id}">
                    Editar
                </button>
                <button class="btn btn-danger btn-sm" data-action="delete-todo" data-todo-id="${todo.id}">
                    Eliminar
                </button>
            </div>
        </div>
    `;
}

/**
 * Escapes HTML to prevent XSS
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========================================
// Event Listeners
// ========================================

/**
 * Attaches listeners to todo cards
 */
function attachTodoCardListeners() {
    // Toggle complete
    document.querySelectorAll('[data-action="toggle-complete"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const todoId = parseInt(e.target.dataset.todoId);
            const isCompleted = e.target.checked;
            updateTodo(todoId, { completed: isCompleted });
        });
    });

    // Edit todo
    document.querySelectorAll('[data-action="edit-todo"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const todoId = parseInt(e.target.dataset.todoId);
            openEditModal(todoId);
        });
    });

    // Delete todo
    document.querySelectorAll('[data-action="delete-todo"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const todoId = parseInt(e.target.dataset.todoId);
            if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
                deleteTodo(todoId);
            }
        });
    });
}

/**
 * Create form submission
 */
DOM.form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = DOM.titleInput.value.trim();
    const description = DOM.descriptionInput.value.trim();

    if (!title) {
        showToast('El título es requerido', 'error');
        return;
    }

    createTodo(title, description);
});

/**
 * Edit form submission
 */
DOM.editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = DOM.editTitle.value.trim();
    const description = DOM.editDescription.value.trim();

    if (!title) {
        showToast('El título es requerido', 'error');
        return;
    }

    updateTodo(editingTodoId, {
        title,
        description: description || null,
    });

    closeEditModal();
});

/**
 * Filter buttons
 */
DOM.filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        DOM.filterButtons.forEach(b => b.classList.remove('filter-active'));
        e.target.classList.add('filter-active');
        currentFilter = e.target.dataset.filter;
        renderTodos();
    });
});

/**
 * Modal controls
 */
DOM.closeModal.addEventListener('click', closeEditModal);
DOM.cancelEdit.addEventListener('click', closeEditModal);

DOM.modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
    if (e.target === DOM.modal.querySelector('.modal-overlay')) {
        closeEditModal();
    }
});

/**
 * Keyboard shortcuts
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && DOM.modal.style.display === 'flex') {
        closeEditModal();
    }
});

// ========================================
// Initialization
// ========================================

/**
 * Initialize the app
 */
function init() {
    fetchTodos();
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
