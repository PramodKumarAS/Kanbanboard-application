# Kanban Board

A Kanban board is an agile project management tool designed to help visualize work, limit work-in-progress, and maximize efficiency (or flow). This Kanban board allows users to add, lock, edit, and remove tasks, as well as filter tasks based on priority.

## Features

- **Create Task Ticket**: 
  - Users can add tasks by clicking the "Add New" button, filling out the task description, and selecting a priority color.
  - Task tickets are auto-generated with unique IDs and displayed on the board.
  - Task tickets are locked by default, preventing edits until unlocked.

- **Locking Mechanism**: 
  - Task tickets can be locked and unlocked by clicking the lock button.
  - When locked, users cannot edit the task description; clicking the lock again unlocks the task for editing.

- **Delete/Remove Task**:
  - Users can remove tasks by selecting the task and clicking the "Remove" button.
  - The "Remove" button can be activated and deactivated by clicking it.

- **Filter Tasks by Color**:
  - Users can filter tasks based on priority color, showing only tasks with the selected color.

## Live Demo

You can view the live version of the app [here](https://pramodkumaras.github.io/Kanbanboard-application/).

## Requirements

1. **Task Creation**:
   - When users click on the "Add New" button, a modal opens where they can enter the task description.
   - Users select a priority color, and when they click the "Shift" button, the task is created and displayed on the board with a unique ID.

2. **Locking Mechanism**:
   - Clicking the lock button locks or unlocks the task, preventing or allowing edits to the task description.

3. **Deleting Tasks**:
   - Users can delete tasks by selecting them and clicking the "Remove" button. Clicking it again deactivates the remove action.

4. **Task Filtering by Color**:
   - Users can filter tasks based on the selected color to organize them visually.

## Approach

1. **Create HTML Structure**
   - Create a section for task tickets, a modal for adding new tasks, and buttons for lock, remove, and filter actions.
   
2. **Apply CSS for Styling**
   - Style the board, task tickets, modal, and buttons for a clean, user-friendly interface.

3. **JavaScript Logic**
   - Add functionality for opening and closing the modal, task creation, locking tasks, and deleting tasks.
   - Implement the filtering mechanism for tasks by color.

## Technologies Used

- **HTML**: For structuring the Kanban board and modal.
- **CSS**: For styling the board, tasks, and modal.
- **JavaScript**: For handling the logic of task creation, locking, removing, and filtering.
  
## Installation

1. **Clone the repository**

   Clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/PramodKumarAS/Kanbanboard-application.git
