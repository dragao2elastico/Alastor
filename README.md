# Alastor

Welcome to the Alastor project repository! This is my official website, encompassing various features and interesting content.

## Project Description

Alastor is a personal website that covers a variety of topics and features. You'll find everything from informative pages to interactive and multimedia resources. This project is developed using JavaScript and Node.js, and it includes numerous pages and functionalities.

## Project Contents

The project includes the following main directories and files:

- `.gitignore`: Git configuration file to ignore specific files and directories.
- `config.json` and `config.template.jsonc`: Project configuration files.
- `events`: Directory containing scripts for the website's events.
    - `pages`: Directory containing the website's pages.
    - `scripts`: Directory containing scripts for events.
- `functions.js`: Utility JavaScript functions.
- `index.js`: Main server file.
- `package-lock.json` and `package.json`: Node.js configuration files.
- `README.md`: This file you are currently reading.
- `server`: Directory containing resources related to the web server.
- Other files and directories related to specific website resources, such as images, videos, styles, and views.

## Configuration Files

To configure your Alastor project, you need to create a `config.json` file based on the provided `config.template.jsonc`. Here's how:

1. Locate the `config.template.jsonc` file in your project directory.
2. Copy `config.template.jsonc` and rename the copied file to `config.json`.
3. Open `config.json`.
4. Update the configuration values in `config.json` according to your preferences and requirements.
5. Save the changes.

Now, your project is configured with your custom settings. You can adjust various aspects of the website, such as server ports, API keys, and other parameters.

## How to Use

To run this project, follow these steps:

1. Clone this repository to your local environment.
2. Ensure you have Node.js installed.
3. Install project dependencies using `npm install`.
4. Start the server with `npm start`.

Be sure to check the scripts and pages within the `events` directory to understand how the website is constructed and how you can add or modify its content.

## Using Scripts

In the `package.json` file, there are several predefined scripts that you can use:

- `start`: This script launches the server using `nodemon`, which automatically restarts the server when code changes are detected. Use this during development.
- `post`: A script that stages and commits all changes to Git with a specified commit message, and then pushes to the main branch. Use this for version control.
- `cli`: A script for running a command-line interface (CLI) test script located in `./events/scripts/cli.test.js`.

To run any of these scripts, open your terminal and use the following command:

```bash
npm run script-name
```

Replace `script-name` with the name of the script you want to execute.

## Contributions

Contributions are welcome! Feel free to open issues or submit pull requests with improvements or fixes.

## License

This project is licensed under the MIT License. Refer to the LICENSE.md file for more details.

## Project Information

- **Name**: Alastor
- **Version**: 1.1.6
- **Author**: [dragao-elastico](https://github.com/dragao2elastico)
- **License**: ISC

## Dependencies

Here are the dependencies listed in my `package.json` file:

```json
{
    "@discordjs/voice": "^0.11.0",
    "better-sqlite3": "^8.5.2",
    "body-parser": "^1.20.2",
    "colors": "^1.4.0",
    "cookie-parser": "^1.4.6",
    "discord.js": "^14.13.0",
    "ejs": "^3.1.9",
    "email": "^0.2.6",
    "express": "^4.18.2",
    "fs": "^0.0.1-security",
    "google-translate-api": "^2.3.0",
    "jsonwebtoken": "^9.0.1",
    "ms": "^2.1.3",
    "nekos.life": "^3.0.0",
    "nodemon": "^3.0.1",
    "passport": "^0.6.0",
    "passport-discord": "^0.1.4",
    "prompt-sync": "^4.2.0",
    "quick.db": "^9.1.7"
}
```

Feel free to further customize this README.md to include specific details about your project, usage instructions, or any other relevant information.

---
