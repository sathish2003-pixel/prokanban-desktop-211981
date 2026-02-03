# ProKanban Desktop - User Guide

## Welcome!

Your ProKanban board is now populated with comprehensive mock data including 3 projects, 4 teams, 8 users, and 29 realistic tasks.

## Getting Started

### Initial View
When you first open the app, you'll see:
- **Project Alpha** selected by default
- **15 tasks** distributed across 5 columns
- **Board view** active

### Navigation

#### Left Sidebar
The sidebar contains all navigation and filtering options:

**Navigation Section:**
- 🔲 **Board** - Kanban board view (default)
- 📅 **Calendar** - Calendar view (placeholder)
- 📊 **Reports** - Reports view (placeholder)
- ⚙️ **Settings** - Settings view (placeholder)

**Projects Section:**
- **Project Alpha** (Blue) - 15 tasks - Main development
- **Project Beta** (Green) - 8 tasks - Marketing & design
- **Project Gamma** (Orange) - 6 tasks - Infrastructure

Click any project to switch and view its tasks.

**Teams Section:**
- **All Teams** - Shows all tasks (default)
- **Engineering** - Backend, frontend, DevOps tasks
- **Design** - UI/UX and design tasks
- **Product** - Product management tasks
- **Marketing** - Marketing and content tasks

Click a team to filter tasks by that team. Click again to deselect.

**Filters Section:**
- **Search** - Search by task title or description
- **Priority** - Filter by high, medium, or low priority
- **Status** - Filter by todo, in-progress, review, or done
- **Assignee** - Filter by team member
- **Labels** - Filter by tags (design, frontend, backend, etc.)

### Working with Tasks

#### Viewing Task Details
Click any task card to open the details panel on the right side.

**Details Panel Shows:**
- Full task title and description
- Task key (e.g., ALPHA-1)
- Status/Column
- Priority level
- Assignee
- Due date
- Labels/Tags
- Created date
- Comments (if any)
- Attachments (if any)

#### Editing Tasks
1. Click a task to open details
2. Click **"Edit Task"** button
3. Modify any fields
4. Click **"Save Changes"** or **"Cancel"**

#### Moving Tasks (Drag & Drop)
- Click and hold any task card
- Drag to a different column
- Release to drop
- Task automatically updates

#### Deleting Tasks
1. Open task details
2. Click **"Delete"** button
3. Confirm deletion

### Switching Views

#### Board View (Default)
- Visual Kanban board with columns
- Drag-and-drop functionality
- Column headers show task counts
- Color-coded priority indicators

#### List View
Click the view toggle in the navbar to switch to list view:
- Tabular display of all tasks
- Shows all task details at once
- Sortable columns
- Easier for reviewing many tasks

### Sample Tasks to Explore

#### High-Priority Tasks
- **ALPHA-4**: User authentication flow (In Progress)
- **ALPHA-9**: Performance optimization (In Review)
- **GAMMA-1**: Kubernetes cluster setup (Backlog)

#### Tasks with Comments
- **ALPHA-1**: Design system setup
- **ALPHA-4**: User authentication flow
- **ALPHA-9**: Performance optimization

#### Tasks with Attachments
- **ALPHA-1**: Design system setup (design-tokens.json)
- **ALPHA-6**: Dashboard UI components (dashboard-mockups.pdf)
- **ALPHA-12**: Requirements gathering (requirements.docx)

### Using Filters

#### Example Filter Combinations

**High Priority Backend Tasks:**
1. Set Priority filter to "high"
2. Set Labels filter to "backend"
3. Results: Critical backend work items

**Sarah Chen's Tasks:**
1. Set Assignee filter to "Sarah Chen"
2. Results: All tasks assigned to Sarah

**Engineering Team in Project Alpha:**
1. Select "Project Alpha" 
2. Select "Engineering" team
3. Results: Engineering tasks in Project Alpha

**Clear Filters:**
Click "Clear All Filters" button at bottom of filters section

### Keyboard and Accessibility

- **Tab** - Navigate between interactive elements
- **Enter/Space** - Activate buttons and links
- **Escape** - Close task details panel
- All interactive elements have proper ARIA labels
- Sidebar can be collapsed for more space

### Collapsible Sidebar

**Collapse:**
- Click the hamburger menu icon (☰) in navbar

**Expand:**
- Click the hamburger menu icon again
- OR hover over collapsed sidebar (peek mode)

### Data Persistence

All changes are automatically saved to browser localStorage:
- Task edits
- Task movements
- Filter selections
- Project/team selections
- View mode preferences
- Sidebar collapse state

**Reset to Default:**
Clear browser localStorage to reset to original mock data:
```javascript
localStorage.clear()
```
Then refresh the page.

### Tips and Tricks

1. **Quick Project Switch**: Use the Projects section in sidebar for one-click project switching

2. **Focus on One Team**: Select a team filter to see only that team's work

3. **Find Overdue Tasks**: Use search or filters to locate tasks past their due date (shown in red)

4. **Track Progress**: Check the "Done" column to see completed work

5. **Plan Sprint**: Use "Selected for Development" column to queue up next tasks

6. **Review Work**: "In Review" column shows tasks awaiting approval

7. **Organize Backlog**: "Backlog" column contains future work items

### Project-Specific Notes

#### Project Alpha (Development)
- 5-column workflow: Backlog → Selected → In Progress → Review → Done
- Focus on technical implementation
- Mix of frontend, backend, and DevOps tasks

#### Project Beta (Marketing)
- 4-column workflow: Backlog → In Progress → Review → Done
- Creative and marketing tasks
- Content creation and design work

#### Project Gamma (Infrastructure)
- 3-column workflow: Backlog → In Progress → Done
- DevOps and infrastructure tasks
- System reliability and performance

### Next Steps

1. **Explore Projects**: Click through all three projects to see different task types
2. **Try Filters**: Experiment with different filter combinations
3. **Move Tasks**: Practice drag-and-drop between columns
4. **Edit Tasks**: Open and modify task details
5. **Switch Views**: Toggle between board and list views

## Support

For issues or questions, refer to:
- `MOCK_DATA_SUMMARY.md` - Technical implementation details
- `README.md` - Project setup and configuration

Enjoy using ProKanban! 🚀
