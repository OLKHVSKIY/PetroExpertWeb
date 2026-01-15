// Chat Widget JavaScript
let chatWidget = null;
let chatButton = null;
let chatMessagesContainer = null;
let chatInput = null;
let chatSendButton = null;

// Initialize chat widget
function initChatWidget() {
    // Create chat button
    chatButton = document.createElement('button');
    chatButton.className = 'chat-button';
    chatButton.setAttribute('aria-label', 'Открыть чат');
    chatButton.innerHTML = `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
    `;
    chatButton.addEventListener('click', toggleChat);

    // Create chat widget
    chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.innerHTML = `
        <div class="chat-header">
            <h3 class="chat-header-title">Чат с оператором</h3>
            <button class="chat-close-button" aria-label="Закрыть чат">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        <div class="chat-messages" id="chatMessages"></div>
        <div class="chat-input-container">
            <div class="chat-input-wrapper">
                <textarea class="chat-input" id="chatInput" placeholder="Напишите сообщение..." rows="1"></textarea>
            </div>
            <button class="chat-send-button" id="chatSendButton" aria-label="Отправить сообщение">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
            </button>
        </div>
    `;

    // Append to body
    document.body.appendChild(chatButton);
    document.body.appendChild(chatWidget);

    // Get references
    chatMessagesContainer = document.getElementById('chatMessages');
    chatInput = document.getElementById('chatInput');
    chatSendButton = document.getElementById('chatSendButton');
    const closeButton = chatWidget.querySelector('.chat-close-button');

    // Event listeners
    closeButton.addEventListener('click', toggleChat);
    chatSendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
    });

    // Initial greeting message
    setTimeout(() => {
        addMessage('operator', 'Здравствуйте! Чем могу помочь?');
    }, 500);
}

// Toggle chat widget
function toggleChat() {
    if (!chatWidget || !chatButton) return;

    const isActive = chatWidget.classList.contains('active');
    
    if (!isActive) {
        // Opening chat
        chatWidget.classList.add('active');
        setTimeout(() => {
            chatButton.style.opacity = '0';
            chatButton.style.pointerEvents = 'none';
            chatInput.focus();
            scrollToBottom();
        }, 200);
    } else {
        // Closing chat
        chatWidget.classList.remove('active');
        chatButton.style.opacity = '1';
        chatButton.style.pointerEvents = 'auto';
    }
}

// Add message to chat
function addMessage(sender, text) {
    if (!chatMessagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'chat-message-bubble';
    
    // Create text node for message
    const textNode = document.createTextNode(text);
    bubbleDiv.appendChild(textNode);
    
    // Add meta only for operator messages, inside the bubble
    if (sender === 'operator') {
        const metaDiv = document.createElement('div');
        metaDiv.className = 'chat-message-meta';
        metaDiv.textContent = 'Оператор';
        bubbleDiv.appendChild(metaDiv);
    }

    messageDiv.appendChild(bubbleDiv);
    chatMessagesContainer.appendChild(messageDiv);

    scrollToBottom();
}

// Send message
function sendMessage() {
    if (!chatInput || !chatSendButton) return;

    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage('user', message);
    chatInput.value = '';
    chatInput.style.height = 'auto';

    // Disable input while "thinking"
    chatInput.disabled = true;
    chatSendButton.disabled = true;

    // Simulate operator response (replace with actual API call)
    setTimeout(() => {
        const responses = [
            'Спасибо за ваш вопрос. Я изучу его и отвечу в ближайшее время.',
            'Понял вас. Давайте уточним детали.',
            'Хороший вопрос! Дайте мне немного времени на подготовку ответа.',
            'Спасибо за обращение. Я передам ваш вопрос специалисту.',
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage('operator', randomResponse);
        
        chatInput.disabled = false;
        chatSendButton.disabled = false;
        chatInput.focus();
    }, 1000 + Math.random() * 1000);
}

// Scroll to bottom of messages
function scrollToBottom() {
    if (chatMessagesContainer) {
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatWidget);
} else {
    initChatWidget();
}
