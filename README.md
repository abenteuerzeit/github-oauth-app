# OAuth with GitHub

This is a sample Node.js application that demonstrates how to authenticate users with GitHub using the OAuth 2.0 protocol. The application uses the Passport library to handle the OAuth flow, the express-session to handle sessions, and the passport-github2 library to handle the GitHub-specific details of the OAuth flow.

## Getting Started

1. Clone this repository
2. Run `npm install` to install the dependencies
3. Create a new GitHub OAuth application from your GitHub settings. You can find more information on how to do this here
4. Create a `.env` file in the root directory (see [.env.example](./.env.example) for an example with the required environment variables):

        GITHUB_CLIENT_ID="" # your GitHub client ID, see .env.example
        GITHUB_CLIENT_SECRET="" # your GitHub client secret, see .env.example
        GITHUB_AUTH_CALLBACK_URL="http://localhost:3000/auth/github"
        SESSION_SECRET="keyboard cat" # example secret for signing the session ID cookie

5. Run the application using `node app.js`
6. Open a web browser and navigate to <http://localhost:3000> to see the application in action

## Features

- Users can log in with their GitHub account
- Users can view their account information
- Users can log out of the application

## Dependencies

- express - web framework
- express-partials - middleware for rendering partials in views
- morgan - middleware for logging HTTP requests
- passport - authentication middleware
- passport-github2 - Passport strategy for authenticating with GitHub using the OAuth 2.0 protocol
- express-session - middleware for handling sessions
- dotenv - loads environment variables from a .env file

## Contributing

This project is open-source and available to use and contribute
