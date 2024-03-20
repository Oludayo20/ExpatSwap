# Expatswap - Api

This is a `React JS` project

First, run the development server:

```bash
npm start


```

## Getting Started

### Prerequisites

- Node.js installed on your local machine
- MongoDB installed and running locally or remotely

### Installation

1. Clone this repository to your local machine:
   ```
   git clone https://github.com/Oludayo20/ExpatSwap
   ```
2. Navigate to the project directory:
   ```
   cd ExpatSwap/client
   ```
3. Install dependencies:
   ```
   npm install
   ```

# CreateUser Component

The `CreateUser` component is a React component used for creating a new user. It provides a form where users can input their personal information such as first name, last name, email, phone number, password, and date of birth. This component also includes client-side validation for email and password fields.

## Dependencies

- [React](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/web/guides/quick-start)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)
- [Axios](https://axios-http.com/)
- [Helmet](https://www.npmjs.com/package/react-helmet)

## Functionality

- Users can input their personal information in the provided form fields.
- Client-side validation is performed for the email and password fields:
  - Email validation ensures that the email format is valid.
  - Password validation ensures that the password meets the required criteria (8 to 24 characters, includes uppercase and lowercase letters, a number, and a special character).
- When the form is submitted, a POST request is sent to the server to create the user.
- Feedback is provided to the user through toast notifications:
  - Success message is displayed upon successful user creation.
  - Error messages are displayed for various error scenarios, such as server response errors, missing fields, and duplicate email addresses.

## Props

The `CreateUser` component does not accept any props.

# AllUser Component

The `AllUser` component is a React component used for displaying a list of all users. It fetches user data from an API and allows users to filter users by date of birth. The component includes pagination for navigating through multiple pages of user data.

## Dependencies

- [React](https://reactjs.org/)
- [axios](https://axios-http.com/)
- [react-toastify](https://fkhadra.github.io/react-toastify/introduction/)

## Functionality

- The component fetches user data from an API endpoint when it mounts.
- Users can filter users by date of birth using start and end date inputs.
- Pagination allows users to navigate through multiple pages of user data.
- Toast notifications are displayed for various error scenarios, such as server response errors.

## Props

The `AllUser` component does not accept any props.

## License

This component is released under the [MIT License](LICENSE).
