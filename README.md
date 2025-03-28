# EmployWise Assignment - React User Management App

## How to Run the Project

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/employwise-assignment.git
cd employwise-assignment
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Start the Application

```sh
npm run dev
```

The app should now be running on `http://localhost:5173/` (or another available port).

## Assumptions and Considerations

- **Authentication Token Handling:** The token is stored in `localStorage` and used for session management.
- **Pagination:** Users are displayed in pages, fetched dynamically from the Reqres API.
- **Error Handling:** API failures are handled with appropriate messages.
- **Form Validation:** Basic validation is implemented for the login and edit forms.

