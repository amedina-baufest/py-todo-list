# Frontend - TODO List Application

Simple and modern frontend for the TODO List API built with vanilla HTML, CSS, and JavaScript with a GitHub-inspired design.

## Features

✨ **Clean & Modern UI**
- GitHub-inspired design with clean typography and visual hierarchy
- Responsive layout that works on all screen sizes
- Smooth animations and transitions
- Dark-friendly color palette

🎯 **Full CRUD Operations**
- Create new todos with title and description
- View all todos with status indicators
- Mark todos as complete/incomplete
- Edit existing todos
- Delete todos with confirmation

🔍 **Smart Filtering & Sorting**
- Filter todos by status (All, Pending, Completed)
- Real-time statistics (Total, Pending, Completed counts)
- Chronological display with relative dates

📱 **Responsive Design**
- Works on desktop, tablet, and mobile devices
- Optimized layouts for different screen sizes
- Touch-friendly buttons and interactions

🎨 **Accessibility**
- Semantic HTML structure
- Keyboard navigation support (ESC to close modals)
- ARIA-friendly form labels
- XSS protection with HTML escaping

## Getting Started

### Prerequisites

1. Backend API running on `http://localhost:8000`
2. A modern web browser (Chrome, Firefox, Safari, Edge)
3. Python 3.12+ and dependencies from `requirements.txt`

### Setup Instructions

#### 1. Start the Backend Server

```bash
# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
python -m uvicorn app.main:app --reload
```

The API will be available at: `http://localhost:8000`

#### 2. Open the Frontend

Simply open `index.html` in your web browser:

**Option A: Direct File Opening**
- Navigate to `/tmp/workspace/amedina-baufest/py-todo-list/index.html`
- Double-click or right-click → Open with Browser

**Option B: Using a Local Server (Recommended)**

Using Python's built-in HTTP server:
```bash
cd /tmp/workspace/amedina-baufest/py-todo-list
python -m http.server 3000
```

Then open: `http://localhost:3000`

### File Structure

```
/tmp/workspace/amedina-baufest/py-todo-list/
├── index.html       # Main HTML structure
├── styles.css       # GitHub-inspired styling
├── app.js           # Frontend logic & API integration
├── FRONTEND.md      # This file
└── README.md        # Backend documentation
```

## Usage Guide

### Creating a Todo

1. Fill in the **Title** field (required)
2. Optionally add a **Description**
3. Click the **"+ Crear tarea"** button
4. The todo will appear in the list below

### Managing Todos

**Mark as Complete:**
- Click the checkbox next to a todo
- Completed todos will be visually distinguished

**Edit a Todo:**
1. Click the **"Editar"** button on a todo card
2. Update the title and/or description in the modal
3. Click **"Guardar cambios"** to save

**Delete a Todo:**
1. Click the **"Eliminar"** button on a todo card
2. Confirm the deletion in the confirmation dialog
3. The todo will be removed from the list

### Filtering Todos

Use the filter buttons to view:
- **Todas** - Show all todos
- **Pendientes** - Show only incomplete todos
- **Completadas** - Show only completed todos

The statistics bar shows real-time counts for each category.

## Design System

### Color Palette (GitHub-Inspired)

```css
Primary Blue:     #0969da  (Links, primary actions)
Success Green:    #2da44e  (Completed status)
Danger Red:       #d1242f  (Delete actions)
Warning Orange:   #c38d09  (Pending status)
Secondary Purple: #6e40c9  (Accents)

Neutral Grays:
  Primary text:   #24292f
  Secondary text: #57606a
  Tertiary text:  #8c959f
  Background:     #ffffff
  Light bg:       #f6f8fa
  Border:         #d0d7de
```

### Typography

- **Font Family:** System UI fonts (-apple-system, Segoe UI, Helvetica, Arial)
- **Headings:** 600-700 font weight
- **Body Text:** 400 font weight
- **Responsive sizing** for different screen sizes

### Spacing & Border Radius

- **Spacing:** 4-tier system (0.5rem, 1rem, 1.5rem, 2rem, 3rem)
- **Border Radius:** 4px (forms), 6-8px (cards), 12px (buttons)
- **Shadows:** Layered for visual depth

## API Integration

### Endpoints Used

The frontend communicates with the following API endpoints:

| Method | Endpoint      | Purpose               |
|--------|---------------|-----------------------|
| GET    | `/todos/`     | Fetch all todos       |
| POST   | `/todos/`     | Create a new todo     |
| PUT    | `/todos/{id}` | Update a todo         |
| DELETE | `/todos/{id}` | Delete a todo         |

### Base URL

```javascript
const API_BASE_URL = 'http://localhost:8000';
```

**Note:** CORS is enabled on the backend, allowing requests from any origin.

## Features in Detail

### Real-Time Updates

- UI updates immediately after API responses
- Statistics refresh automatically
- List re-renders to reflect current state

### Error Handling

- Network errors show friendly toast notifications
- Validation feedback for required fields
- Duplicate prevention with confirmation dialogs

### Notifications

Toast notifications provide feedback for:
- ✅ Successful actions (green)
- ❌ Error messages (red)
- ℹ️ Information messages (blue)

Notifications auto-dismiss after 3 seconds.

### Date Formatting

Dates are displayed in relative format:
- "Hoy a las HH:MM" - Today with time
- "Ayer" - Yesterday
- "Hace X días" - X days ago
- "DD/MM/YYYY" - Older dates in full format

## Browser Compatibility

Tested and working on:
- ✅ Chrome/Chromium 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Keyboard Shortcuts

- **ESC** - Close edit modal

## Security Features

- **XSS Protection:** HTML content is escaped to prevent injection attacks
- **CORS:** Backend configured to allow frontend requests
- **Input Validation:** Required fields are validated on client side
- **Confirmation Dialogs:** Destructive actions require user confirmation

## Performance Optimizations

- Minimal dependencies (vanilla JavaScript, no frameworks)
- Efficient DOM manipulation
- CSS Grid and Flexbox for optimal layout
- Event delegation for dynamic elements
- CSS animations with GPU acceleration

## Responsive Breakpoints

- **Desktop:** 1200px+ (multi-column grid)
- **Tablet:** 768px - 1199px (adjusted spacing)
- **Mobile:** Under 768px (single column, optimized touch targets)
- **Small Mobile:** Under 480px (compact spacing)

## Future Enhancement Ideas

- 🔄 Real-time sync with WebSockets
- 🔍 Search and advanced filtering
- 📅 Due dates and reminders
- 🏷️ Tags and categories
- 👥 Collaborative features
- 💾 Local storage backup
- 🌙 Dark mode toggle
- 📊 Progress visualization

## Development

### Code Structure

- **index.html** - Semantic HTML with accessibility focus
- **styles.css** - CSS custom properties (variables) for easy theming
- **app.js** - Modular JavaScript with clear separation of concerns

### Key Functions

**API Functions:**
- `fetchTodos()` - Get all todos
- `createTodo(title, description)` - Create new todo
- `updateTodo(id, updates)` - Update existing todo
- `deleteTodo(id)` - Delete a todo

**UI Functions:**
- `renderTodos()` - Render filtered todo list
- `openEditModal(todoId)` - Open edit form
- `closeEditModal()` - Close edit form
- `showToast(message, type)` - Display notifications

**Utility Functions:**
- `getFilteredTodos()` - Filter based on current filter
- `formatDate(dateString)` - Format dates relationally
- `escapeHtml(text)` - Escape HTML for security
- `updateStats()` - Update statistics display

## Troubleshooting

### Todos Not Loading

**Problem:** Empty todo list on page load
- **Solution:** Ensure backend API is running on `http://localhost:8000`
- Check browser console for errors (F12)
- Verify CORS is enabled on backend

### API Errors

**Problem:** Toast shows "Error al cargar las tareas"
- **Solution:** Check network tab in DevTools (F12 → Network)
- Verify API URL in `app.js` matches your setup
- Ensure backend server is running

### Styling Issues

**Problem:** Layout looks broken
- **Solution:** Clear browser cache (Ctrl+Shift+Delete)
- Try different browser
- Check console for CSS errors

### Modal Not Closing

**Problem:** Edit modal stays open
- **Solution:** Press ESC key
- Click outside the modal
- Refresh page

## License

This frontend is part of the TODO List API project.

## Support

For issues or questions about the frontend:
1. Check the README.md in the root directory
2. Review API documentation in the same README
3. Check browser console for error messages
4. Verify backend is running and accessible

---

**Happy Task Managing! ✅**
