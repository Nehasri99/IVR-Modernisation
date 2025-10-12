Markdown

# 🎙️ Conversational IVR Modernization Middleware


This project is a **Node.js Express middleware** designed to modernize traditional **digit-based IVR (Interactive Voice Response)** systems. It serves as an **intelligent bridge**, enabling legacy IVR menus to support **modern conversational AI**, allowing users to interact with the system using **natural language voice commands**.

The core of this project is a **dual-mode system** that can handle both **traditional numeric inputs** and **natural language queries**, routing them to the appropriate backend services while ensuring **backward compatibility**.

---

## ✨ Key Features

-   **Dual-Mode Operation:** Seamlessly supports both traditional digit-based requests (`POST /ivr/request`) and modern natural language queries (`POST /conversation/process`).

-   **Conversational AI Engine:** Integrates a robust, keyword-based **Intent Handler (`intentService.js`)** to understand user speech, map it to specific actions, and translate it into commands the legacy system can understand.

-   **Legacy System Integration:** Intelligently routes requests to **mock backend services (ACS and BAP)**, demonstrating a professional and scalable approach to backward compatibility.

-   **Full IVR Menu:** The system supports a comprehensive menu of actions, including **balance checks, recharges, transaction history, loan info, agent support,** and more.

-   **Text-to-Speech Ready:** The architecture is designed to support a frontend with **text-to-speech** capabilities, providing an end-to-end conversational experience.

-   **Professional Structure:** Built with a **clean, scalable architecture** (Routes, Controllers, Services) for easy maintenance and future expansion.

---

## 🧱 Project Structure

The project follows a standard and organized structure to separate concerns.

```
middleware-project/
├── controllers/
│   ├── ivrController.js          # Logic for digit-based IVR requests
│   ├── conversationController.js # Logic for natural language queries
│   ├── acsController.js          # Handles requests for the mock ACS service
│   └── bapController.js          # Handles requests for the mock BAP service
│
├── routes/
│   ├── ivrRoutes.js              # Defines the /ivr/* endpoints
│   ├── conversationRoutes.js     # Defines the /conversation/* endpoints
│   ├── acsRoutes.js              # Defines the /acs/* endpoints
│   └── bapRoutes.js              # Defines the /bap/* endpoints
│
├── services/
│   ├── intentService.js          # The "brain" - maps user speech to intents
│   ├── acsService.js             # Simulates the legacy ACS backend
│   └── bapService.js             # Simulates the legacy BAP backend
│
├── utils/
│   └── logger.js                 # Contains the global error handler
│
├── .env                          # Environment configuration (PORT, URLs)
├── .gitignore                    # Specifies files for Git to ignore
├── index.js                      # The main entry point of the server
├── package.json                  # Node.js dependencies and scripts
└── README.md                     # This project documentation file
```


---

## 🛠️ Tech Stack

-   **Backend:** Node.js, Express.js
-   **API Communication:** Axios
-   **Configuration:** dotenv
-   **Development:** Nodemon

---

## 🚀 How to Run This Project

### Prerequisites

-   **Node.js** (v16 or higher recommended)
-   **npm** (Node Package Manager)

### 1. Clone the Repository

Open your terminal and clone the project to your local machine.
```bash
git clone [https://github.com/Nehasri99/IVR-Modernisation.git](https://github.com/Nehasri99/IVR-Modernisation.git)
cd IVR-Conversational-Middleware
(Remember to replace your-username with your actual GitHub username)

2. Install Dependencies
This command will install all the necessary packages for the project, such as Express and Axios.

Bash

npm install
3. Set Up Environment Variables
Create a file named .env in the root of the project. This file is essential for configuring the server and its internal URLs.

# Server Configuration
PORT=3000
BASE_URL=http://localhost:3000

# Legacy Service URLs
ACS_URL=http://localhost:3000/acs
BAP_URL=http://localhost:3000/bap
4. Run the Server
This command uses nodemon to start the server. nodemon will automatically restart the server whenever you make changes to the code, which is very convenient for development.

Bash

npm run dev
You will see a confirmation in your terminal: 🚀 Middleware running at http://localhost:3000

🌐 API Endpoints
The middleware exposes two main endpoints for interacting with the IVR system.

1. Legacy Digit-Based IVR
This endpoint handles traditional IVR requests based on a numeric digit.

Endpoint: POST /ivr/request

Description: Processes requests from a user pressing a number on a dialpad.

Request Body:

JSON

{
  "sessionId": "some-session-id",
  "digit": "1"
}
2. Conversational AI
This endpoint handles natural language queries from the user, typically captured from a voice command.

Endpoint: POST /conversation/process

Description: Processes a user's spoken sentence to determine their intent and execute an action.

Request Body:

JSON

{
  "sessionId": "some-session-id",
  "query": "I want to check my account balance"
}
🔮 Future Enhancements
This project provides a solid foundation that can be extended with several professional features:

True AI Integration: Replace the simple keyword-based intentService with a real Natural Language Understanding (NLU) platform like Google Dialogflow, Rasa, or Amazon Lex for much more accurate intent recognition.

Database Integration: Store conversation logs, user sessions, or user data in a database like MongoDB or PostgreSQL instead of relying on mock services.

User Authentication: Implement a basic authentication layer to handle user-specific information securely.

Cloud Deployment: Deploy the application to a cloud platform like Heroku, Vercel, or an AWS EC2 instance to make it publicly accessible.

📜 License
This project is licensed under the MIT License. See the LICENSE file for more details.
