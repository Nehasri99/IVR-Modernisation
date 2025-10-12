
---

```markdown
# 🎙️ Conversational IVR Modernization Middleware

This project is a **Node.js Express middleware** designed to modernize traditional **digit-based IVR (Interactive Voice Response)** systems.  
It serves as an **intelligent bridge**, enabling legacy IVR menus to support **modern conversational AI**, allowing users to interact with the system using **natural language voice commands**.

The core of this project is a **dual-mode system** that can handle both **traditional numeric inputs** and **natural language queries**, routing them to the appropriate backend services while ensuring **backward compatibility**.

---

## ✨ Key Features

- **Dual-Mode Operation:** Seamlessly supports both traditional digit-based requests (`POST /ivr/request`) and modern natural language queries (`POST /conversation/process`).

- **Conversational AI Engine:** Integrates a robust, keyword-based **Intent Handler (`intentService.js`)** to understand user speech, map it to specific actions, and translate it into commands the legacy system can understand.

- **Legacy System Integration:** Intelligently routes requests to **mock backend services (ACS and BAP)**, demonstrating a professional and scalable approach to backward compatibility.

- **Full IVR Menu:** The system supports a comprehensive menu of actions, including **balance checks, recharges, transaction history, loan info, agent support,** and more.

- **Text-to-Speech Ready:** The architecture is designed to support a frontend with **text-to-speech** capabilities, providing an end-to-end conversational experience.

- **Professional Structure:** Built with a **clean, scalable architecture** (Routes, Controllers, Services) for easy maintenance and future expansion.

---

## 🧱 Project Structure

```

middleware-project/
│
├── controllers/
│   ├── ivrController.js          # Handles digit-based IVR requests
│   └── conversationController.js # Handles natural language queries
│
├── routes/
│   ├── ivrRoutes.js              # Defines /ivr/request endpoint
│   └── conversationRoutes.js     # Defines /conversation/process endpoint
│
├── services/
│   ├── intentService.js          # Maps user intents to backend actions
│   ├── acsService.js             # Simulates legacy ACS backend service
│   └── bapService.js             # Simulates legacy BAP backend service
│
├── .env                          # Environment configuration (PORT, URLs)
├── package.json                  # Node.js dependencies and scripts
├── server.js                     # Entry point of the middleware
└── README.md                     # Project documentation

````

**Explanation:**
- **controllers/** – Contains logic for handling each type of request.  
- **routes/** – Defines all API endpoints for the middleware.  
- **services/** – Holds modules that connect to or simulate backend services.  
- **server.js** – Initializes the Express app and loads routes.  
- **.env** – Stores configuration details (like service URLs).  

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **API Communication:** Axios  
- **Configuration:** dotenv  
- **Development:** Nodemon  

---

## 🚀 How to Run This Project

### **Prerequisites**
- **Node.js** (v16 or higher)  
- **npm** (Node Package Manager)  

---

### **1. Clone the Repository**

```bash
git clone https://github.com/Nehasri99/IVR-Modernisation.git
cd IVR-Modernisation
````

---

### **2. Install Dependencies**

This command will install all the necessary packages for the project, such as Express and Axios.

```bash
npm install
```

---

### **3. Set Up Environment Variables**

Create a file named **`.env`** in the root of the project.
This file is essential for configuring the server and service URLs.

**Server Configuration**

```
PORT=3000
BASE_URL=http://localhost:3000
```

**Legacy Service URLs**

```
ACS_URL=http://localhost:3000/acs
BAP_URL=http://localhost:3000/bap
```

---

### **4. Run the Server**

This command uses **nodemon** to start the server.
Nodemon automatically restarts the server whenever you make changes to the code — convenient for development.

```bash
npm run dev
```

You will see a confirmation in your terminal:

```
🚀 Middleware running at http://localhost:3000
```

---

## 🌐 API Endpoints

The middleware exposes two main endpoints for interacting with the IVR system.

### **1. Legacy Digit-Based IVR**

**Endpoint:** `POST /ivr/request`
**Description:** Processes requests from a user pressing a number on a dialpad.

**Request Body:**

```json
{
  "sessionId": "some-session-id",
  "digit": "1"
}
```

---

### **2. Conversational AI**

**Endpoint:** `POST /conversation/process`
**Description:** Processes a user's spoken sentence to determine their intent and execute an action.

**Request Body:**

```json
{
  "sessionId": "some-session-id",
  "query": "I want to check my account balance"
}
```

---

## 📜 License

This project is licensed under the **MIT License**.
See the **LICENSE** file for more details.

```

---

```
