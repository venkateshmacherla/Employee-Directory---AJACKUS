
## Overview

This project is a responsive and interactive Employee Directory built using HTML, CSS, JavaScript, and Freemarker templates. It demonstrates modern front-end development principles with modular code structure, dynamic DOM manipulation, and user-friendly UI practices.

## Features

- Dashboard displaying employee details: ID, First Name, Last Name, Email, Department, Role.
- Add/Edit Form with client-side JavaScript validation.
- Filtering by First Name, Department, Role.
- Search bar for name and email lookup.
- Sorting by First Name and Department.
- Pagination options (10, 25, 50, 100) or infinite scroll.
- Responsive layout for desktop, tablet, and mobile.
- Local JavaScript array simulates employee data via Freemarker rendering.
- Graceful error handling for invalid form inputs and edit/delete interactions.

## Setup Instructions

1. Clone the repository:
git clone https://github.com/your-username/employee-directory.git

2. Open `index.html` in a modern browser.
3. No backend or server is needed; all data operations run client-side.

## Employee Directory Web Interface

employee-directory/
├── assets/
│   ├── scripts.js           # Core JavaScript logic for filtering, sorting, pagination, and form handling
│   └── styles.css           # Modular and responsive styling for all pages
├── form.html                # Add/Edit employee form with client-side validation
├── index.html               # Dashboard page displaying employee directory with edit/delete actions
├── README.md                # Project description, setup instructions, structure, and reflection


## Challenges Faced

- Handling seamless UI updates after editing/deleting without backend sync.
- Coordinating dynamic filters with search and sort across multiple states.
- Maintaining layout adaptability across screen sizes.

## Improvements If Given More Time

- Persist employee data using browser localStorage.
- Add bulk actions and confirmation modals.
- Implement drag-and-drop UI for department reassignment.
- Add transition animations for a smoother user experience.

## Notes

- Employee data is passed using Freemarker’s `<#assign>` from mock JSON.
- All interactivity is built using vanilla JavaScript.
- Minimal dependencies; no external frameworks or APIs involved.
- Clear code comments aid readability and maintenance.

## Screenshots
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/5cb733de-a639-44d4-822c-771001170382" />
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/668a8003-23fa-4e14-a95c-ffce4bc59fd0" />
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/437448c4-e8b4-4308-afb1-d7a1fb9b9af4" />
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/44f1ac98-53e0-4c9b-9514-252add3d796a" />
<img width="300" height="550" alt="image" src="https://github.com/user-attachments/assets/0e4690f2-9672-4bd8-b780-09bcbc6fccc6" />
<img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/f30b92ad-b76c-4648-baa2-cac87c4fe033" />








