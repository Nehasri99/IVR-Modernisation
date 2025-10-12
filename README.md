**Conversational IVR Modernization Middleware** This project is a sophisticated Node.js Express middleware designed to modernize traditional digit-based IVR (Interactive Voice Response) systems. It serves as an intelligent bridge, enabling legacy IVR menus to support modern conversational AI, allowing users to interact with the system using natural language voice commands.

The core of this project is a dual-mode system that can handle both traditional numeric inputs and natural language queries, routing them to the appropriate backend services while ensuring backward compatibility.

**✨ Key Features**

**Dual-Mode Operation:** Seamlessly supports both traditional digit-based requests (POST /ivr/request) and modern natural language queries (POST /conversation/process).

**Conversational AI Engine:** Integrates a robust, keyword-based Intent Handler (intentService.js) to understand user speech, map it to specific actions, and translate it into commands the legacy system can understand.

**Legacy System Integration:** Intelligently routes requests to mock backend services (ACS and BAP), demonstrating a professional and scalable approach to backward compatibility.

**Full IVR Menu:** The system supports a comprehensive menu of actions, including balance checks, recharges, transaction history, loan info, agent support, and more.

**Text-to-Speech Ready:** The architecture is designed to support a frontend with text-to-speech capabilities, providing an end-to-end conversational experience.

**Professional Structure:** Built with a clean, professional, and scalable architecture (Routes, Controllers, Services) for easy maintenance and future expansion.

**🛠️ Tech Stack**

**Backend:** Node.js, Express.js

**API Communication:** Axios

**Configuration:** dotenv

**Development:** Nodemon

🚀 How to Run This Project Prerequisites Node.js (v16 or higher)

**npm (Node Package Manager)**

1. Clone the Repository Open your terminal and clone the repository to your local machine.

git clone https://github.com/your-username/IVR-Modernisation.git cd IVR-Modernisation

2. Install Dependencies This command will install all the necessary packages for the project, such as Express and Axios.

npm install

3. Set Up Environment Variables Create a file named .env in the root of the project. This file is essential for configuring the server and service URLs.

**Server Configuration**
PORT=3000 BASE_URL=http://localhost:3000

**Legacy Service URLs**
ACS_URL=http://localhost:3000/acs BAP_URL=http://localhost:3000/bap

4. Run the Server This command uses nodemon to start the server. nodemon will automatically restart the server whenever you make changes to the code, which is very convenient for development.

npm run dev

You will see a confirmation in terminal: 🚀 Middleware running at http://localhost:3000.

API Endpoints The middleware exposes two main endpoints for interacting with the IVR system.

1. Legacy Digit-Based IVR This endpoint handles traditional IVR requests based on a numeric digit.

**Endpoint:** POST /ivr/request

Description: Processes requests from a user pressing a number on a dialpad.

**Request Body:**

{ "sessionId": "some-session-id", "digit": "1" }

2. Conversational AI This endpoint handles natural language queries from the user, typically captured from a voice command.

**Endpoint**: POST /conversation/process

**Description:** Processes a user's spoken sentence to determine their intent and execute an action.

**Request Body:**

{ "sessionId": "some-session-id", "query": "I want to check my account balance" }

📜 License This project is licensed under the MIT License. See the LICENSE file for more details.
