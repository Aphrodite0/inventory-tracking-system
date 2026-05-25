# To-Do List Application

A modern, feature-rich to-do list web application with local storage functionality. Your tasks are automatically saved in your browser's local storage, so you never lose your data!

## Features

✨ **Core Features:**
- ✅ Add, complete, and delete tasks
- 💾 Automatic local storage persistence
- 🎯 Priority levels (High, Medium, Low)
- 🔍 Filter tasks by status and priority
- 📊 Real-time statistics (Total, Completed, Pending)
- 🎨 Beautiful, responsive design
- ⌨️ Keyboard support (Enter to add tasks)
- 📱 Mobile-friendly interface

## How to Use

### 1. **Open the Application**
Download and open `index.html` in your web browser.

### 2. **Add a Task**
- Type your task in the input field
- Press "Add" button or hit Enter
- Task appears at the top of the list

### 3. **Complete a Task**
- Click the checkbox next to a task
- Task will show as completed with strikethrough
- Statistics update automatically

### 4. **Delete a Task**
- Click the "✕" button on the right side of any task
- Task is removed immediately

### 5. **Filter Tasks**
- **All** - Show all tasks
- **Pending** - Show only incomplete tasks
- **Completed** - Show only completed tasks
- **High Priority** - Show only high priority tasks

### 6. **Manage Tasks**
- **Clear Completed** - Remove all completed tasks
- **Clear All** - Remove all tasks (use with caution!)

## How It Works

### Local Storage
- All tasks are stored in your browser's local storage
- Data persists even after closing the browser
- No internet connection required
- Each browser/device has separate storage

### Data Structure
Each task contains:
```javascript
{
    id: 1234567890,           // Unique identifier
    text: "Task description", // The task text
    completed: false,         // Completion status
    priority: "medium",       // Priority level (high, medium, low)
    createdAt: "2026-05-25..."// Creation timestamp
}
```

## Project Files

### `index.html`
- HTML structure
- Inline CSS styling
- Responsive design
- Beautiful gradient background

### `app.js`
- Task management logic
- Local storage handling
- Filter and sort functionality
- DOM manipulation

## Technical Details

### Browser Compatibility
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with local storage support

### Local Storage API
- Uses `localStorage.setItem()` to save
- Uses `localStorage.getItem()` to retrieve
- Automatic synchronization
- ~5-10MB storage per domain (browser dependent)

### Class: TaskManager
Handles all application logic:
- `init()` - Initialize the app
- `addTask()` - Add new task
- `deleteTask()` - Remove task
- `toggleTask()` - Mark complete/incomplete
- `filterTasks()` - Apply filter
- `getFilteredTasks()` - Get filtered list
- `save()` - Save to local storage
- `render()` - Update display
- `updateStats()` - Update counters
- `clearCompleted()` - Remove completed tasks
- `clearAll()` - Remove all tasks

## Features in Detail

### ⭐ Priority System
- **High** (Red badge) - Urgent tasks
- **Medium** (Orange badge) - Normal priority
- **Low** (Teal badge) - Lower priority

### 📊 Statistics Dashboard
- **Total** - All tasks count
- **Completed** - Finished tasks count
- **Pending** - Incomplete tasks count

Updates automatically as you work!

### 🎯 Smart Filtering
- Filters work independently
- Show/hide tasks based on criteria
- Statistics remain visible
- Filter state persists while active

### 💾 Auto-Save Feature
- Every action saves to local storage
- Add, complete, delete all auto-save
- No manual save required
- Refresh page to verify persistence

## Getting Started

1. **Download** `index.html` and `app.js`
2. **Place** both files in the same folder
3. **Open** `index.html` in a web browser
4. **Start** adding tasks!

## Tips & Tricks

- 💡 Use high priority for urgent tasks
- 📅 Tasks are stored with creation timestamps
- 🔄 Refresh the page - your tasks remain!
- 📱 Works on mobile devices
- ⚡ Super fast - no server required
- 🌙 Works offline

## Customization

### Change Colors
Edit the CSS in `index.html`:
- Primary gradient: `#667eea` to `#764ba2`
- Modify the `body` background property

### Add More Priority Levels
In `app.js`, expand the priority options and update CSS

### Change Storage Key
Modify `'tasks'` in the `localStorage` calls to use a different key

## Troubleshooting

### Tasks Not Saving?
- Check if local storage is enabled
- Check browser privacy settings
- Try a different browser

### Lost Tasks?
- Check browser's local storage hasn't been cleared
- Try using private/incognito mode separately
- Browser caches might have old version

### Tasks Disappearing?
- Browser's storage might have been cleared
- Check if running in private/incognito mode
- Verify not using multiple browser profiles

## Browser Storage Limits

- **Chrome**: ~10MB per domain
- **Firefox**: ~10MB per domain
- **Safari**: ~5MB per domain
- **Edge**: ~10MB per domain

For typical to-do lists, you can store thousands of tasks!

## Performance

- ⚡ Instant load times
- 💨 Zero lag on interactions
- 🎯 Optimized rendering
- 📦 No external dependencies

## Future Enhancement Ideas

- ✨ Drag and drop reordering
- 🏷️ Add tags/categories
- 📅 Due dates
- 🔔 Reminders
- 🎨 Custom themes
- 📤 Export/Import
- ☁️ Cloud sync
- 🌙 Dark mode toggle

## License

Free to use and modify!

---

**Ready to organize your tasks? Download and open `index.html` now!** 🚀
