// Chat Widget - With Tabs (AI Assistant & Operator Chat)
let chatWidget = null;
let chatButton = null;
let chatMessagesContainer = null;
let chatInput = null;
let chatSendButton = null;
let isChatOpen = false;
let scrollPosition = 0;
let currentTab = 'ai'; // 'ai' or 'operator'
let isFirstAIMessage = true; // Track if first message in AI chat

// Initialize chat widget
function initChatWidget() {
    // Determine base path for assets
    const isInPages = window.location.pathname.includes('/pages/');
    const iconPath = isInPages ? '../assets/icons/chat-ai.png' : 'assets/icons/chat-ai.png';
    
    // Create chat button
    chatButton = document.createElement('button');
    chatButton.className = 'chat-button';
    chatButton.setAttribute('aria-label', 'Открыть чат');
    chatButton.innerHTML = `
        <img src="${iconPath}" alt="Чат" class="chat-button-icon">
    `;
    chatButton.addEventListener('click', toggleChat);

    // Create chat widget with tabs
    chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.innerHTML = `
        <div class="chat-header-minimal">
            <div class="chat-tabs">
                <button class="chat-tab active" data-tab="ai">ИИ Ассистент</button>
                <button class="chat-tab" data-tab="operator">Чат с оператором</button>
            </div>
            <button class="chat-close-button" aria-label="Закрыть чат">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        <div class="chat-content">
            <div class="chat-tab-content active" data-content="ai">
                <div class="chat-messages" id="chatMessagesAI"></div>
                <div class="ai-info-card" id="aiInfoCard">
                    <h4 class="ai-info-title">Что я умею?</h4>
                    <ul class="ai-info-list">
                        <li>Расскажу какая экспертиза вам нужна</li>
                        <li>Соориетнирую по стоимости услуги</li>
                        <li>Могу перенаправить на <button class="ai-info-link" id="switchToOperatorBtn">Чат с Оператором</button></li>
                    </ul>
                </div>
            </div>
            <div class="chat-tab-content" data-content="operator">
                <div class="chat-messages" id="chatMessagesOperator"></div>
            </div>
        </div>
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
    chatMessagesContainer = document.getElementById('chatMessagesAI');
    const operatorMessagesContainer = document.getElementById('chatMessagesOperator');
    chatInput = document.getElementById('chatInput');
    chatSendButton = document.getElementById('chatSendButton');
    const closeButton = chatWidget.querySelector('.chat-close-button');
    const tabButtons = chatWidget.querySelectorAll('.chat-tab');
    const switchToOperatorBtn = document.getElementById('switchToOperatorBtn');

    // Event listeners
    closeButton.addEventListener('click', toggleChat);
    chatSendButton.addEventListener('click', sendMessage);
    
    // Tab switching
    tabButtons.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    // Switch to operator from AI info card
    if (switchToOperatorBtn) {
        switchToOperatorBtn.addEventListener('click', () => {
            switchTab('operator');
        });
    }
    
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    chatInput.addEventListener('input', () => {
        chatInput.style.height = '44px';
        const newHeight = Math.min(chatInput.scrollHeight, 120);
        if (newHeight > 44) {
            chatInput.style.height = newHeight + 'px';
        }
    });

    // Prevent body scroll when scrolling inside chat
    if (chatMessagesContainer) {
        chatMessagesContainer.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        }, { passive: true });

        chatMessagesContainer.addEventListener('wheel', (e) => {
            e.stopPropagation();
        }, { passive: true });
    }

    if (operatorMessagesContainer) {
        operatorMessagesContainer.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        }, { passive: true });

        operatorMessagesContainer.addEventListener('wheel', (e) => {
            e.stopPropagation();
        }, { passive: true });
    }

    // Prevent body scroll on mobile when chat is open
    document.addEventListener('touchmove', (e) => {
        if (isChatOpen && window.innerWidth <= 480) {
            const messagesContainers = [chatMessagesContainer, operatorMessagesContainer];
            const isInChat = messagesContainers.some(container => 
                container && container.contains(e.target)
            ) || chatWidget.contains(e.target);
            
            if (!isInChat) {
                e.preventDefault();
            }
        }
    }, { passive: false });

    // Prevent body scroll on desktop when chat is open
    document.addEventListener('wheel', (e) => {
        if (isChatOpen) {
            const messagesContainers = [chatMessagesContainer, operatorMessagesContainer];
            const isInChat = messagesContainers.some(container => 
                container && container.contains(e.target)
            ) || chatWidget.contains(e.target);
            
            if (!isInChat) {
                e.preventDefault();
            }
        }
    }, { passive: false });

    // Initial greeting message for operator chat only
    setTimeout(() => {
        if (operatorMessagesContainer) {
            addMessage('operator', 'Здравствуйте! Чем могу помочь?', 'operator');
        }
    }, 500);
}

// Switch between tabs
function switchTab(tabName) {
    currentTab = tabName;
    
    // Update tab buttons
    const tabButtons = chatWidget.querySelectorAll('.chat-tab');
    tabButtons.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Update tab content
    const tabContents = chatWidget.querySelectorAll('.chat-tab-content');
    tabContents.forEach(content => {
        if (content.getAttribute('data-content') === tabName) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });

    // Update messages container reference
    if (tabName === 'ai') {
        chatMessagesContainer = document.getElementById('chatMessagesAI');
    } else {
        chatMessagesContainer = document.getElementById('chatMessagesOperator');
    }

    // Focus input
    if (chatInput) {
        chatInput.focus();
    }
}

// Toggle chat widget
function toggleChat() {
    if (!chatWidget || !chatButton) return;

    const isActive = chatWidget.classList.contains('active');
    const isMobile = window.innerWidth <= 480;
    
    if (!isActive) {
        // Opening chat
        isChatOpen = true;
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Apply mobile-specific styles BEFORE opening
        if (isMobile) {
            chatWidget.style.position = 'fixed';
            chatWidget.style.top = '0';
            chatWidget.style.left = '0';
            chatWidget.style.right = '0';
            chatWidget.style.bottom = '0';
            chatWidget.style.width = '100vw';
            chatWidget.style.width = '100dvw';
            chatWidget.style.height = '100vh';
            chatWidget.style.height = '100dvh';
            chatWidget.style.margin = '0';
            chatWidget.style.padding = '0';
            chatWidget.style.borderRadius = '0';
            chatWidget.style.boxShadow = 'none';
            chatWidget.style.transform = 'translateY(100%)';
        }
        
        chatWidget.classList.add('active');
        
        if (isMobile) {
            // Lock body scroll on mobile
            document.body.classList.add('chat-open');
            document.documentElement.classList.add('chat-open');
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
            
            // Force chat widget to fill screen with animation
            setTimeout(() => {
                chatWidget.style.transform = 'translateY(0)';
            }, 10);
        } else {
            // Prevent body scroll on desktop
            document.body.style.overflow = 'hidden';
        }
        
        setTimeout(() => {
            chatButton.style.opacity = '0';
            chatButton.style.pointerEvents = 'none';
            chatInput.focus();
            scrollToBottom();
        }, 100);
    } else {
        // Closing chat
        isChatOpen = false;
        
        if (window.innerWidth <= 480) {
            chatWidget.style.transform = 'translateY(100%)';
        }
        
        setTimeout(() => {
            chatWidget.classList.remove('active');
            
            if (window.innerWidth <= 480) {
                // Restore original styles for mobile when closed
                chatWidget.style.position = '';
                chatWidget.style.top = '';
                chatWidget.style.left = '';
                chatWidget.style.right = '';
                chatWidget.style.bottom = '';
                chatWidget.style.width = '';
                chatWidget.style.height = '';
                chatWidget.style.margin = '';
                chatWidget.style.padding = '';
                chatWidget.style.borderRadius = '';
                chatWidget.style.boxShadow = '';
                chatWidget.style.transform = '';
            }
            
            // Restore body scroll
            document.body.classList.remove('chat-open');
            document.documentElement.classList.remove('chat-open');
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            
            chatButton.style.opacity = '1';
            chatButton.style.pointerEvents = 'auto';
        }, 300);
    }
}

// Add message to chat
function addMessage(sender, text, tab = null) {
    const targetTab = tab || currentTab;
    const containerId = targetTab === 'ai' ? 'chatMessagesAI' : 'chatMessagesOperator';
    const messagesContainer = document.getElementById(containerId);
    
    if (!messagesContainer) return;

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
        metaDiv.textContent = targetTab === 'ai' ? 'ИИ Ассистент' : 'Оператор';
        bubbleDiv.appendChild(metaDiv);
    }

    messageDiv.appendChild(bubbleDiv);
    messagesContainer.appendChild(messageDiv);

    scrollToBottom();
}

// Send message
function sendMessage() {
    if (!chatInput || !chatSendButton) return;

    const message = chatInput.value.trim();
    if (!message) return;

    // Hide AI info card after first message in AI chat
    if (currentTab === 'ai' && isFirstAIMessage) {
        const aiInfoCard = document.getElementById('aiInfoCard');
        if (aiInfoCard) {
            aiInfoCard.style.opacity = '0';
            aiInfoCard.style.transform = 'translate(-50%, -60%) scale(0.95)';
            aiInfoCard.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            setTimeout(() => {
                aiInfoCard.style.display = 'none';
            }, 300);
        }
        isFirstAIMessage = false;
    }

    // Add user message
    addMessage('user', message);
    chatInput.value = '';
    chatInput.style.height = '44px';

    // Disable input while "thinking"
    chatInput.disabled = true;
    chatSendButton.disabled = true;

    // Simulate response based on current tab
    setTimeout(() => {
        let response;
        if (currentTab === 'ai') {
            const aiResponses = [
                'Спасибо за ваш вопрос. Я изучу его и отвечу в ближайшее время.',
                'Понял вас. Давайте уточним детали.',
                'Хороший вопрос! Дайте мне немного времени на подготовку ответа.',
            ];
            response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        } else {
            const operatorResponses = [
                'Спасибо за обращение. Я передам ваш вопрос специалисту.',
                'Понял вас. Сейчас уточню детали у специалиста.',
            ];
            response = operatorResponses[Math.floor(Math.random() * operatorResponses.length)];
        }
        
        addMessage('operator', response);
        
        chatInput.disabled = false;
        chatSendButton.disabled = false;
        chatInput.focus();
    }, 1000 + Math.random() * 1000);
}

// Scroll to bottom of messages
function scrollToBottom() {
    const containerId = currentTab === 'ai' ? 'chatMessagesAI' : 'chatMessagesOperator';
    const messagesContainer = document.getElementById(containerId);
    
    if (messagesContainer) {
        requestAnimationFrame(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatWidget);
} else {
    initChatWidget();
}
