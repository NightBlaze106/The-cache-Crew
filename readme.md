# Exoplanet Odyssey -  The planet Explorer

Cosmic Wars is a web application that allows users to explore and compare exoplanets. This project includes both a backend server built with Express.js and a frontend interface.

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/)
* You have a Windows/Linux/Mac machine with a command line interface.

## Installing Cosmic Wars

To install Cosmic Wars, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/cosmic-wars.git
   cd cosmic-wars
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Running Cosmic Wars

To run Cosmic Wars, follow these steps:

1. Start the backend server:
   ```
   node backend/server.js
   ```
   The server should start running on `http://localhost:3000`.

2. Open the frontend:
   - Navigate to the `frontend` directory
   - Open `index.html` in a web browser

   Alternatively, if you have a simple HTTP server installed (like `http-server` for Node.js), you can serve the frontend:
   ```
   cd frontend
   http-server
   ```
   Then open `http://localhost:8080` in your web browser.

## Using Cosmic Wars

Here's a brief overview of how to use the application:

1. The home page displays two random exoplanets for comparison.
2. Use the search bar to find specific exoplanets.
3. Click on "Compare" to see a detailed comparison between two planets.

## Troubleshooting

If you encounter any issues:
- Ensure all dependencies are correctly installed
- Check that the backend server is running and accessible
- Verify that the `planets.json` file is present and correctly formatted
- Check the browser console and server logs for any error messages

## Contributing to Cosmic Wars

To contribute to Cosmic Wars, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively, see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Contact

If you want to contact me, you can reach me at `<your_email@example.com>`.

## License

This project uses the following license: [<license_name>](<link_to_license>).
