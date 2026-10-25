# Job Application Manager

React application for saving and organizing job applications.

## Features

- Add, view, edit, and delete applications.
- Track each application as Pending, Interview, Accepted, or Rejected.
- Search by name, position, company, or email; filter by status and sort by date.
- Keep application data in the current browser using `localStorage`.
- Validate contact details and required fields before saving.

## Run locally

From this project directory, run:

```bash
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

To create a production build, run `npm run build`.

## Data storage

Applications are stored in the browser's local storage on this device and browser. There is no server or account sync in this project.
