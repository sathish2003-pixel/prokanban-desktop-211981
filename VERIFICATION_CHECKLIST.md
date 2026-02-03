# ProKanban Mock Data - Verification Checklist

Use this checklist to quickly verify that the mock data implementation is working correctly.

## Quick Verification Steps

### 1. App Loads Successfully
- [ ] App opens without errors
- [ ] No console errors in browser DevTools
- [ ] UI renders completely

### 2. Default State (First Load)
- [ ] **Project Alpha** is selected by default
- [ ] **Board view** is active
- [ ] **5 columns** are visible:
  - Backlog
  - Selected for Development
  - In Progress
  - In Review
  - Done
- [ ] **15 tasks** are visible total
- [ ] Column counts show: **3, 2, 3, 2, 5**

### 3. Task Display
- [ ] All tasks show title
- [ ] Task keys are visible (ALPHA-1, ALPHA-2, etc.)
- [ ] Priority badges are color-coded
- [ ] Labels/tags are visible on tasks
- [ ] Assignee names are shown

### 4. Task Interaction
- [ ] Clicking a task opens the details panel
- [ ] Details panel shows all task information
- [ ] "Edit Task" button is visible
- [ ] "Delete" button is visible
- [ ] Close button (X) closes the panel

### 5. Drag and Drop
- [ ] Tasks can be clicked and held
- [ ] Dragging shows a preview/overlay
- [ ] Dropping in a new column moves the task
- [ ] Column task counts update after move

### 6. Project Switching
**Switch to Project Beta:**
- [ ] Click "Project Beta" in sidebar
- [ ] **8 tasks** appear
- [ ] **4 columns** are visible:
  - Backlog
  - In Progress
  - Review
  - Done
- [ ] Task keys change to BETA-1, BETA-2, etc.

**Switch to Project Gamma:**
- [ ] Click "Project Gamma" in sidebar
- [ ] **6 tasks** appear
- [ ] **3 columns** are visible:
  - Backlog
  - In Progress
  - Done
- [ ] Task keys change to GAMMA-1, GAMMA-2, etc.

### 7. Team Filtering
**With Project Alpha selected:**
- [ ] Click "Engineering" team
- [ ] Task count reduces (only Engineering tasks shown)
- [ ] Sidebar shows "Engineering" as active
- [ ] Click "Engineering" again to deselect
- [ ] All tasks return

**Try other teams:**
- [ ] "Design" team filter works
- [ ] "Product" team filter works
- [ ] "Marketing" team filter works
- [ ] "All Teams" shows everything

### 8. Search Functionality
- [ ] Type "authentication" in search box
- [ ] Task "User authentication flow" appears
- [ ] Other tasks are filtered out
- [ ] Clear search box to show all tasks again

### 9. Filter Functionality
**Priority Filter:**
- [ ] Click "High" priority filter
- [ ] Only high-priority tasks show
- [ ] Click "High" again to deselect

**Status Filter:**
- [ ] Click "In Progress" status
- [ ] Only in-progress tasks show
- [ ] Click again to deselect

**Assignee Filter:**
- [ ] Click "Sarah Chen"
- [ ] Only Sarah's tasks show
- [ ] Click again to deselect

**Labels Filter:**
- [ ] Click "backend" label
- [ ] Only backend tasks show
- [ ] Click "frontend" label (in addition)
- [ ] Tasks with either label show
- [ ] Click to deselect

**Clear Filters:**
- [ ] Apply multiple filters
- [ ] Click "Clear All Filters" button
- [ ] All filters reset
- [ ] All tasks reappear

### 10. List View
- [ ] Toggle to list view (switch in navbar)
- [ ] Table shows all tasks
- [ ] Columns: Task, Status, Priority, Assignee, Due Date, Labels
- [ ] Same filtering works in list view
- [ ] Click a task row to open details
- [ ] Toggle back to board view

### 11. Sidebar Collapse
- [ ] Click hamburger menu (☰) to collapse sidebar
- [ ] Sidebar collapses to icon-only
- [ ] Main content area expands
- [ ] Hover over collapsed sidebar
- [ ] Sidebar peeks out (temporary expand)
- [ ] Move mouse away, sidebar collapses
- [ ] Click hamburger menu to permanently expand

### 12. Data Persistence
- [ ] Move a task to a different column
- [ ] Switch to a different project
- [ ] Refresh the browser page
- [ ] App returns to last viewed project
- [ ] Task changes are persisted

### 13. Task Details
Open task "ALPHA-1" (Design system setup):
- [ ] Key shows: ALPHA-1
- [ ] Title: "Design system setup"
- [ ] Description is shown
- [ ] Priority: High
- [ ] Assignee: Emily Rodriguez
- [ ] Labels include: design, frontend, enhancement
- [ ] Due date: Feb 15, 2024
- [ ] Comments section shows 2 comments
- [ ] Attachments section shows 1 file

### 14. Task Editing
- [ ] Open any task
- [ ] Click "Edit Task"
- [ ] Form fields become editable
- [ ] Change the title
- [ ] Click "Save Changes"
- [ ] Changes are reflected in card
- [ ] Open task again to verify changes persist

### 15. Task Counts Accuracy
**Verify Sidebar Counts:**
- [ ] Project Alpha shows 15
- [ ] Project Beta shows 8
- [ ] Project Gamma shows 6
- [ ] Engineering team shows correct count
- [ ] Design team shows correct count

**Verify Column Counts (Project Alpha):**
- [ ] Backlog: 3
- [ ] Selected for Development: 2
- [ ] In Progress: 3
- [ ] In Review: 2
- [ ] Done: 5

## Expected Data Summary

### Projects
| Key | Name | Tasks | Columns |
|-----|------|-------|---------|
| ALPHA | Project Alpha | 15 | 5 |
| BETA | Project Beta | 8 | 4 |
| GAMMA | Project Gamma | 6 | 3 |

### Teams
| Name | Color | Expected Tasks |
|------|-------|----------------|
| Engineering | Blue | 19+ |
| Design | Purple | 7+ |
| Product | Green | 2+ |
| Marketing | Orange | 5+ |

### Users (8 total)
- Sarah Chen
- John Doe
- Mike Johnson
- Emily Rodriguez
- David Kim
- Lisa Anderson
- James Wilson
- Maria Garcia

### Labels (14 total)
bug, feature, enhancement, design, frontend, backend, documentation, security, performance, ui, database, devops, testing, api

## Common Issues and Solutions

### Issue: No tasks visible
**Solution:** Check that Project Alpha is selected and no filters are active

### Issue: Task counts seem wrong
**Solution:** Clear all filters and reset team selection to "All Teams"

### Issue: Drag and drop not working
**Solution:** Ensure you're clicking and holding for at least 200ms before dragging

### Issue: Changes not persisting
**Solution:** Check browser localStorage is enabled and not full

### Issue: Sidebar won't expand
**Solution:** Click the hamburger menu icon in the navbar

## Console Checks

Open browser DevTools console and run:

```javascript
// Check localStorage has data
console.log('Kanban data:', localStorage.getItem('kanbanData'));

// Check project setting
console.log('Current project:', localStorage.getItem('currentProjectId'));

// Count tasks in storage
const data = JSON.parse(localStorage.getItem('kanbanData'));
console.log('Total tasks:', data.tasks.length);
console.log('Projects:', data.boards.length);
console.log('Lists:', data.lists.length);
```

**Expected output:**
- kanbanData: (large JSON string)
- currentProjectId: "project-1"
- Total tasks: 29
- Projects: 3
- Lists: 12

## Performance Checks

- [ ] Initial load completes in < 2 seconds
- [ ] Task filtering is instant
- [ ] Drag operations are smooth
- [ ] No lag when switching projects
- [ ] No lag when opening task details

## Accessibility Checks

- [ ] Tab key navigates through all interactive elements
- [ ] Enter key activates buttons
- [ ] Escape key closes modals
- [ ] Focus is visible on all elements
- [ ] Color contrast is sufficient

## Final Validation

If all checks pass:
✅ **Mock data implementation is complete and functional!**

If any checks fail:
1. Review the specific section that failed
2. Check browser console for errors
3. Verify localStorage is working
4. Try clearing cache and refreshing
5. Check `IMPLEMENTATION_STATUS.md` for known issues

---

**Last Updated:** January 2025  
**Version:** 1.0  
**Status:** Production Ready
