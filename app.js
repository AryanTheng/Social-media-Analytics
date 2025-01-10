// Variables for DOM manipulation
const chatArea = document.getElementById('chatArea');
const messageInput = document.getElementById('messageInput');
const inputArea = document.getElementById('inputArea');
const sidebar = document.getElementById('sidebar');
const conversationList = document.getElementById('conversationList');
const currentChatTitle = document.getElementById('currentChatTitle');
const startChatButton = document.getElementById('startChatButton');

// Store active conversation state
let activeConversation = null;
let conversations = {};

// Sidebar visibility toggle
function toggleSidebar() {
    sidebar.classList.toggle('show');
}

// Start a new conversation
function startNewConversation() {
    const conversationId = 'conv_' + Date.now(); // Unique ID for each conversation
    conversations[conversationId] = [];
    activeConversation = conversationId;

    // Show chat area after a new conversation starts
    document.querySelector('.main-content').style.display = 'flex';
    startChatButton.style.display = 'none'; // Hide the "Start New Conversation" button

    // Add conversation to sidebar
    const conversationItem = document.createElement('li');
    conversationItem.textContent = `Conversation ${Object.keys(conversations).length}`;

    // Add delete button to the conversation item
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '×';
    deleteBtn.onclick = (e) => {
        e.stopPropagation(); // Prevent the conversation click event
        deleteConversation(conversationId);
    };

    conversationItem.appendChild(deleteBtn);
    conversationItem.onclick = () => loadConversation(conversationId);
    conversationList.appendChild(conversationItem);

    loadConversation(conversationId);
}

// Load a conversation from the sidebar
function loadConversation(conversationId) {
    activeConversation = conversationId;
    currentChatTitle.textContent = `Conversation ${Object.keys(conversations).indexOf(conversationId) + 1}`;

    // Show the chat area
    document.querySelector('.chat-area').style.display = 'flex';

    // Clear the chat area
    chatArea.innerHTML = '';

    // Display chat history
    conversations[conversationId].forEach((message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', message.sender);
        messageElement.innerText = message.text;
        chatArea.appendChild(messageElement);
    });

    chatArea.scrollTop = chatArea.scrollHeight; // Scroll to the latest message
}

// Delete a conversation
function deleteConversation(conversationId) {
    // Remove the conversation from the list
    delete conversations[conversationId];

    // Remove the conversation from the sidebar
    const conversationItems = document.querySelectorAll('.sidebar .conversation li');
    conversationItems.forEach(item => {
        if (item.textContent.includes(`Conversation ${Object.keys(conversations).length + 1}`)) {
            item.remove();
        }
    });

    // Reset chat area if active conversation is deleted
    if (activeConversation === conversationId) {
        activeConversation = null;
        currentChatTitle.textContent = 'Select or Start a Conversation';
        document.querySelector('.chat-area').style.display = 'none'; // Hide chat area
        startChatButton.style.display = 'block'; // Show the start chat button again
    }
}

// Handle Enter key to send message
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Send a message function
function sendMessage() {
    const message = messageInput.value.trim();
    if (message === '') return;

    // Display user's message
    const userMessage = { sender: 'user', text: message };
    conversations[activeConversation].push(userMessage);
    displayMessage(userMessage);

    messageInput.value = ''; // Clear input

    // Simulate bot reply
    setTimeout(() => {
        const botMessage = { sender: 'bot', text: 'This is a bot reply: ' + message };
        conversations[activeConversation].push(botMessage);
        displayMessage(botMessage);
    }, 1000);
}

// Function to display a message
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', message.sender);
    messageElement.innerText = message.text;
    chatArea.appendChild(messageElement);
    chatArea.scrollTop = chatArea.scrollHeight; // Scroll to the latest message
}

// Close the sidebar when clicking outside it or pressing Escape key
document.addEventListener('click', function (event) {
    if (!sidebar.contains(event.target) && !event.target.classList.contains('toggle-sidebar')) {
        sidebar.classList.remove('show');
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        sidebar.classList.remove('show');
    }
});
