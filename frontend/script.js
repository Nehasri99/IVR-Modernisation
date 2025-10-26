// IVR System Frontend JavaScript - Mobile Interface Version

let currentSessionId = generateSessionId();
const API_BASE = 'http://localhost:3000'; // Make sure this matches your backend

// --- UI Elements ---
const screens = {
  call: document.getElementById("call-screen"),
  keypad: document.getElementById("keypad-screen"),
};
const callScreen = screens.call;
const keypadScreen = screens.keypad;
const keypadToggleButton = document.getElementById("keypad-toggle-btn");
const hideKeypadButton = document.getElementById("hide-keypad-btn");
const transcript = document.getElementById("transcript");
const keypadButtons = document.querySelectorAll(".key:not(.hidden)"); // Select only visible keys
const talkBtnMain = document.getElementById("talk-btn-main");
const talkBtnKeypad = document.getElementById("talk-btn-keypad");
const timerDisplay = document.getElementById("timer");
const hangupBtns = document.querySelectorAll(".hangup-btn");
const statusElement = document.getElementById('status');
const sessionIdElement = document.getElementById('sessionId');
const timeElement = document.getElementById('time');

// --- State Variables ---
let callTimerInterval = null;
let callSeconds = 0;
let isRecording = false;
let recognition = null;

// --- Text-to-Speech Function ---
function speak(text) {
  if ('speechSynthesis' in window && text) {
    window.speechSynthesis.cancel(); // Stops any previous speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // You can change this
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  } else {
    if (!text) console.log("Speak function called with empty text.");
    else console.warn('Text-to-speech not supported or no text provided.');
  }
}

// --- Session Management ---
function generateSessionId() {
  return 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
}

function updateSessionDisplay() {
  if (sessionIdElement) {
    sessionIdElement.textContent = `Session: ${currentSessionId.split('-')[1]}`;
  }
}

// --- Status & UI Updates ---
function setStatus(statusText) {
  if (statusElement) {
    statusElement.className = 'status'; // Reset class
    switch (statusText.toLowerCase()) {
      case 'ready':
        statusElement.textContent = 'Ready';
        statusElement.classList.add('ready');
        break;
      case 'processing':
        statusElement.textContent = 'Processing...';
        statusElement.classList.add('processing');
        break;
      case 'listening':
        statusElement.textContent = 'Listening...';
        statusElement.classList.add('processing'); // Use processing color
        break;
      case 'error':
        statusElement.textContent = 'Error';
        statusElement.classList.add('error');
        break;
      default:
        statusElement.textContent = statusText;
    }
  }
}

// --- Transcript Management ---
function addToTranscript(text, type = "bot") {
  if (transcript && text) {
    const p = document.createElement("p");
    p.textContent = text;
    p.className = type === "user" ? "user-message" : "bot-message";
    transcript.appendChild(p);
    // Smooth scroll to the bottom
    transcript.scrollTo({ top: transcript.scrollHeight, behavior: 'smooth' });
  }
}

// --- Call Timer ---
function startCallTimer() {
  stopCallTimer(); // Clear any existing timer
  callSeconds = 0;
  callTimerInterval = setInterval(() => {
    callSeconds++;
    const mins = String(Math.floor(callSeconds / 60)).padStart(2, "0");
    const secs = String(callSeconds % 60).padStart(2, "0");
    if (timerDisplay) timerDisplay.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopCallTimer() {
  if (callTimerInterval) {
    clearInterval(callTimerInterval);
    callTimerInterval = null;
  }
}

// --- Update Phone Status Bar Time ---
function updateStatusBarTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    if (timeElement) timeElement.textContent = `${hours}:${minutes}`;
}


// --- Screen Switching Logic ---
function showScreen(screenId) {
  Object.values(screens).forEach(screen => {
    if (screen) screen.classList.remove('active');
  });
  if (screens[screenId]) {
    screens[screenId].classList.add('active');
  }
}

// --- API Call Functions ---
async function callIVR(digit) {
  addToTranscript(`Pressed: ${digit}`, "user");
  setStatus('processing');
  
  try {
    const response = await fetch(`${API_BASE}/ivr/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: currentSessionId, digit: digit })
    });
    const data = await response.json();

    if (response.ok) {
      setStatus('ready');
      addToTranscript(data.response, "bot");
      speak(data.response);
    } else {
      setStatus('error');
      const errorMessage = data.error || 'API error';
      addToTranscript(`Error: ${errorMessage}`, "bot");
      speak(`Error: ${errorMessage}`);
    }
  } catch (error) {
    setStatus('error');
    const errorMessage = `Connection error. Is the server running?`;
    addToTranscript(errorMessage, "bot");
    speak(errorMessage);
  }
}

async function processSpeechCommand(transcript) {
  // Don't add "You said..." here, handleSpeechInput does it.
  setStatus('processing');

  try {
    const response = await fetch(`${API_BASE}/conversation/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: currentSessionId, query: transcript })
    });
    const data = await response.json();

    if (response.ok) {
      setStatus('ready');
      const responseMessage = data.response || 'No response received';
      addToTranscript(responseMessage, "bot");
      speak(responseMessage);
    } else {
       setStatus('error');
       const errorMessage = data.details || data.error || `HTTP ${response.status}`;
       addToTranscript(`Error: ${errorMessage}`, "bot");
       speak(`Error: ${errorMessage}`);
    }
  } catch (error) {
    setStatus('error');
    const errorMessage = `Connection error. Is the server running?`;
    addToTranscript(errorMessage, "bot");
    speak(errorMessage);
  } finally {
     updateTalkButtons(false); // Reset talk buttons after processing
  }
}


// --- Voice Recognition Setup & Controls ---
function initializeSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false; // Listen for a single utterance
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log('Voice recognition started');
      setStatus('listening');
      updateTalkButtons(true); // Indicate recording visually
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      console.log('Speech recognized:', transcript);
      // Add user speech to transcript immediately
      addToTranscript(`You said: "${transcript}"`, "user"); 
      if (transcript) {
        processSpeechCommand(transcript);
      } else {
         addToTranscript("Couldn't hear that clearly. Please try again.", "bot");
         speak("Couldn't hear that clearly. Please try again.");
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
       let errorMessage = `Speech Error: ${event.error}. Try again.`;
       if (event.error === 'not-allowed') {
           errorMessage = 'Microphone access denied. Please allow microphone access in browser settings.';
       } else if (event.error === 'no-speech') {
           errorMessage = 'No speech detected. Please speak clearly.';
       }
      addToTranscript(errorMessage, "bot");
      speak(errorMessage);
      setStatus('error');
    };

    recognition.onend = () => {
      console.log('Voice recognition ended');
      // Ensure state is correctly reset even if recognition ends unexpectedly
      isRecording = false; 
      updateTalkButtons(false);
      // Ensure status is not stuck on listening if no result/error occurred
      if (statusElement && statusElement.textContent === 'Listening...') {
          setStatus('ready');
      }
    };

  } else {
    console.warn("Speech Recognition not supported in this browser.");
    // Optionally disable talk buttons if not supported
    if(talkBtnMain) talkBtnMain.disabled = true;
    if(talkBtnKeypad) talkBtnKeypad.disabled = true;
    addToTranscript("Speech recognition is not supported in this browser.", "bot");
  }
}

function handleSpeechInput() {
  if (!recognition) {
     addToTranscript("Speech recognition not supported.", "bot");
     speak("Speech recognition not supported.");
     return;
   }
  if (isRecording) {
    // If already recording, stop it
    recognition.stop(); 
  } else {
    // If not recording, start it
    try {
      isRecording = true; // Set state before starting
      recognition.start();
    } catch(e) {
      isRecording = false; // Reset state if start fails immediately
      console.error("Error starting recognition:", e);
      addToTranscript("Could not start listening. Please try again.", "bot");
      speak("Could not start listening. Please try again.");
      updateTalkButtons(false);
    }
  }
}

function updateTalkButtons(isNowRecording) {
    const buttons = [talkBtnMain, talkBtnKeypad];
    buttons.forEach(btn => {
        if (!btn) return;
        const icon = btn.querySelector('i');
        const span = btn.querySelector('span');
        
        if (isNowRecording) {
            btn.classList.add('recording-active'); // Add a class for styling (red background)
            if (span) span.textContent = "Listening";
            if (icon) icon.className = "fas fa-stop"; // Change icon to stop
        } else {
            btn.classList.remove('recording-active');
            if (span) span.textContent = "Talk";
            if (icon) icon.className = "fas fa-microphone"; // Change icon back to mic
            
            // Re-apply pulse effect for ready state
            btn.classList.remove('pulse'); 
            void btn.offsetWidth; // Force reflow to restart animation
            btn.classList.add('pulse'); 
        }
    });
}


// --- App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  updateSessionDisplay();
  initializeSpeechRecognition();
  updateStatusBarTime();
  setInterval(updateStatusBarTime, 30000); // Update time every 30s
  startCallTimer();

  // --- Event Listeners ---
  if (keypadToggleButton) {
    keypadToggleButton.addEventListener("click", () => {
      showScreen('keypad');
      // Speak initial prompt only once when keypad is first shown
      if (!transcript.hasChildNodes()) {
          const initialPrompt = "Please speak your request or press a number.";
          addToTranscript(initialPrompt, "bot");
          speak(initialPrompt);
      }
    });
  }

  if (hideKeypadButton) {
    hideKeypadButton.addEventListener("click", () => showScreen('call'));
  }

  keypadButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const digit = button.getAttribute('data-digit');
      if (digit) {
          // Visual feedback
          button.classList.add('pressed');
          setTimeout(() => button.classList.remove('pressed'), 150);
          callIVR(digit);
      }
    });
  });

  if (talkBtnMain) talkBtnMain.addEventListener("click", handleSpeechInput);
  if (talkBtnKeypad) talkBtnKeypad.addEventListener("click", handleSpeechInput);

  // Hang up functionality (Placeholder - just resets timer for now)
  hangupBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          console.log("Hang up clicked");
          stopCallTimer();
          if (timerDisplay) timerDisplay.textContent = "00:00";
          if (transcript) transcript.innerHTML = ''; // Clear transcript
          showScreen('call'); // Go back to call screen
          setStatus('ready');
          startCallTimer(); // Restart timer for a 'new call'
           addToTranscript("Call ended. Ready for a new call.", "bot");
           speak("Call ended.");
           // Optionally: Regenerate session ID
           // currentSessionId = generateSessionId();
           // updateSessionDisplay();
           if (isRecording) { // Ensure recording stops on hang up
               recognition.stop();
           }
      });
  });

  // Initial prompt on load (optional)
  // const welcome = "Welcome to the IVR System.";
  // addToTranscript(welcome, "bot");
  // speak(welcome);
});
