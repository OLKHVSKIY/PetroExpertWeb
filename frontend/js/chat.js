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
let conversationHistory = []; // Store conversation history for AI context

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

    // Auto-resize textarea (only expand when text wraps to multiple lines)
    chatInput.addEventListener('input', () => {
        // Store the text value to check if it's single line
        const text = chatInput.value;
        
        // Always reset to minimum height first to calculate from consistent baseline
        chatInput.style.height = '44px';
        
        // Force a reflow to ensure scrollHeight is calculated correctly
        const scrollHeight = chatInput.scrollHeight;
        
        // Calculate single line height: padding (12px top + 12px bottom) + line-height for one line
        // For font-size 0.9375rem (15px) and line-height 1.5, one line is ~22.5px
        // Total: 12 + 12 + 22.5 = 46.5px, but we use 44px as base
        // Check if text actually wraps by comparing scrollHeight to a threshold for single line
        // If scrollHeight is significantly more than expected single line height, text has wrapped
        const singleLineHeight = 44; // Our base height
        const threshold = 46; // Slight buffer for measurement differences
        
        if (scrollHeight > threshold) {
            // Text has wrapped to multiple lines - allow expansion up to max
            chatInput.style.height = Math.min(scrollHeight, 120) + 'px';
        } else {
            // Text fits in one line - keep at 44px
            chatInput.style.height = '44px';
        }
    });
    
    // Ensure initial height is always set to 44px
    if (chatInput) {
        chatInput.style.height = '44px';
    }

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

    // Prevent body scroll on desktop only when scrolling inside chat widget
    document.addEventListener('wheel', (e) => {
        if (isChatOpen && window.innerWidth > 480) {
            // Check if target element is inside chat widget
            const messagesContainers = [chatMessagesContainer, operatorMessagesContainer];
            const isTargetInChat = chatWidget.contains(e.target) || 
                messagesContainers.some(container => container && container.contains(e.target));
            
            // Check if scrolling inside chat messages container
            const isScrollingInMessages = messagesContainers.some(container => 
                container && container.contains(e.target)
            );
            
            // Only prevent page scroll if scrolling inside chat but not in messages area
            // Allow scrolling inside chat messages, but prevent page scroll when hovering chat
            if (isTargetInChat && !isScrollingInMessages) {
                // Mouse is in chat widget but not scrolling messages - prevent page scroll
                e.preventDefault();
            }
            // If target is outside chat or scrolling inside messages, allow it
        }
    }, { passive: false });
    
    // Allow page scrolling when mouse is outside chat (check on mousemove)
    let isMouseOverChat = false;
    if (chatWidget) {
        chatWidget.addEventListener('mouseenter', () => {
            isMouseOverChat = true;
        });
        
        chatWidget.addEventListener('mouseleave', () => {
            isMouseOverChat = false;
        });
    }

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
            // Don't block body scroll on desktop - allow scrolling when mouse is outside chat
            // Wheel event handler will prevent scroll only when mouse is inside chat
            // document.body.style.overflow = 'hidden'; // Removed - allow page scrolling
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

// Add message to chat with optional typing effect
function addMessage(sender, text, tab = null, expertise = null, typingEffect = false) {
    const targetTab = tab || currentTab;
    const containerId = targetTab === 'ai' ? 'chatMessagesAI' : 'chatMessagesOperator';
    const messagesContainer = document.getElementById(containerId);
    
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'chat-message-bubble';
    
    // Add text content with markdown support
    if (text) {
        if (typingEffect && sender === 'operator') {
            // Add typing effect for AI responses
            addTypingEffect(bubbleDiv, text);
        } else {
            // Add text immediately
            addTextContent(bubbleDiv, text);
        }
    }
    
    // Add expertise card if provided
    if (expertise && sender === 'operator') {
        const expertiseCard = createExpertiseCard(expertise);
        bubbleDiv.appendChild(expertiseCard);
    }
    
    // Add meta only for operator messages, inside the bubble
    if (sender === 'operator') {
        const metaDiv = document.createElement('div');
        metaDiv.className = 'chat-message-meta';
        metaDiv.textContent = targetTab === 'ai' ? 'ИИ Ассистент' : 'Оператор';
        bubbleDiv.appendChild(metaDiv);
    }

    messageDiv.appendChild(bubbleDiv);
    messagesContainer.appendChild(messageDiv);

    // Add to conversation history for AI tab
    if (targetTab === 'ai') {
        conversationHistory.push({
            role: sender,
            content: text
        });
        // Keep only last 10 messages for context
        if (conversationHistory.length > 10) {
            conversationHistory = conversationHistory.slice(-10);
        }
    }

    scrollToBottom();
}

// Add text content with markdown support
function addTextContent(container, text) {
    // Convert markdown **text** to <strong>text</strong>
    const processedText = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Parse text with line breaks
    const textLines = processedText.split('\n');
    textLines.forEach((line, index) => {
        if (line.trim() || index < textLines.length - 1) {
            // Create span for line to support HTML
            const lineSpan = document.createElement('span');
            lineSpan.innerHTML = line || '&nbsp;';
            container.appendChild(lineSpan);
            if (index < textLines.length - 1) {
                container.appendChild(document.createElement('br'));
            }
        }
    });
}

// Add typing effect - character by character
function addTypingEffect(container, text) {
    // Split text into lines
    const lines = text.split('\n');
    let lineIndex = 0;
    let charIndex = 0;
    let isBold = false;
    let currentElement = null;
    
    const typeChar = () => {
        if (lineIndex >= lines.length) {
            return;
        }
        
        const line = lines[lineIndex];
        
        if (charIndex >= line.length) {
            // End of line - add line break and move to next line
            if (lineIndex < lines.length - 1) {
                container.appendChild(document.createElement('br'));
            }
            lineIndex++;
            charIndex = 0;
            isBold = false;
            currentElement = null;
            
            if (lineIndex < lines.length) {
                setTimeout(typeChar, 100);
            }
            return;
        }
        
        const char = line[charIndex];
        
        // Check for markdown **
        if (char === '*' && charIndex < line.length - 1 && line[charIndex + 1] === '*') {
            // Toggle bold
            isBold = !isBold;
            currentElement = null; // Reset current element
            charIndex += 2; // Skip both asterisks
            setTimeout(typeChar, 10);
            return;
        }
        
        // Create element if needed
        if (!currentElement || (currentElement.tagName === 'SPAN' && isBold) || (currentElement.tagName === 'STRONG' && !isBold)) {
            currentElement = document.createElement(isBold ? 'strong' : 'span');
            container.appendChild(currentElement);
        }
        
        // Add character
        currentElement.textContent += char;
        charIndex++;
        
        // Scroll to bottom only if user is near bottom (allow manual scrolling)
        // Check scroll position - only auto-scroll if user is already at bottom
        const containerId = currentTab === 'ai' ? 'chatMessagesAI' : 'chatMessagesOperator';
        const messagesContainer = document.getElementById(containerId);
        if (messagesContainer) {
            const isNearBottom = messagesContainer.scrollHeight - messagesContainer.scrollTop - messagesContainer.clientHeight < 100;
            // Only auto-scroll every 20 characters and only if user is near bottom
            if (charIndex % 20 === 0 && isNearBottom) {
                scrollToBottom();
            }
        }
        
        // Type next character with delay (faster for spaces)
        const delay = char === ' ' ? 15 : 10;
        setTimeout(typeChar, delay);
    };
    
    typeChar();
}

// Create expertise card HTML element
function createExpertiseCard(expertise) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'chat-expertise-card';
    
    const isInPages = window.location.pathname.includes('/pages/');
    const basePath = isInPages ? '../' : '';
    const expertiseLink = expertise.link ? (expertise.link.startsWith('http') ? expertise.link : `${basePath}${expertise.link}`) : '#';
    
    cardDiv.innerHTML = `
        <div class="chat-expertise-card-content">
            <h4 class="chat-expertise-card-title">${expertise.title}</h4>
            <p class="chat-expertise-card-description">${expertise.description}</p>
            <div class="chat-expertise-card-details">
                <div class="chat-expertise-card-detail">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>${expertise.duration}</span>
                </div>
                <div class="chat-expertise-card-detail">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>${expertise.price}</span>
                </div>
            </div>
            <a href="${expertiseLink}" class="chat-expertise-card-button">Подробнее</a>
        </div>
    `;
    
    return cardDiv;
}

// Send message
async function sendMessage() {
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

    // Add user message to UI first
    addMessage('user', message);
    chatInput.value = '';
    // Force height reset to 44px after clearing
    chatInput.style.height = '44px';
    // Ensure it stays at 44px
    setTimeout(() => {
        chatInput.style.height = '44px';
    }, 0);

    // Disable input while "thinking"
    chatInput.disabled = true;
    chatSendButton.disabled = false; // Keep enabled but show loading state

    // Show typing indicator for AI tab
    if (currentTab === 'ai') {
        // Add typing indicator
        const containerId = 'chatMessagesAI';
        const messagesContainer = document.getElementById(containerId);
        if (messagesContainer) {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'chat-message operator';
            typingDiv.id = 'typingIndicator';
            typingDiv.innerHTML = `
                <div class="chat-message-bubble">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
            messagesContainer.appendChild(typingDiv);
            scrollToBottom();
        }

        // Call AI API
        if (window.API && window.API.ai) {
            try {
                const response = await window.API.ai.chat(message, conversationHistory);
                
                // Remove typing indicator
                const typingIndicator = document.getElementById('typingIndicator');
                if (typingIndicator) {
                    typingIndicator.remove();
                }
                
                // Check if response is successful
                if (response && response.success === false) {
                    addMessage('operator', response.message || 'Извините, произошла ошибка. Попробуйте переформулировать вопрос.', 'ai');
                } else if (response && response.message) {
                    // Add AI response with expertise card if available and typing effect
                    addMessage('operator', response.message, 'ai', response.expertise || null, true);
                } else {
                    // Unexpected response format
                    console.warn('Unexpected API response format:', response);
                    addMessage('operator', 'Извините, не удалось получить ответ. Попробуйте переформулировать вопрос.', 'ai');
                }
            } catch (error) {
                console.error('AI Chat Error:', error);
                
                // Remove typing indicator
                const typingIndicator = document.getElementById('typingIndicator');
                if (typingIndicator) {
                    typingIndicator.remove();
                }
                
                // Show error message with details in console
                const errorMsg = error.message || 'Извините, произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте переформулировать вопрос или свяжитесь с нашим оператором.';
                console.error('Full error details:', error);
                addMessage('operator', errorMsg);
            }
        } else {
            // Fallback if API not available
            setTimeout(() => {
                const typingIndicator = document.getElementById('typingIndicator');
                if (typingIndicator) {
                    typingIndicator.remove();
                }
                addMessage('operator', 'Спасибо за ваш вопрос. Я изучу его и отвечу в ближайшее время.');
            }, 1000);
        }
        
        chatInput.disabled = false;
        chatSendButton.disabled = false;
        chatInput.focus();
    } else {
        // Operator tab - simulate response
        setTimeout(() => {
            const operatorResponses = [
                'Спасибо за обращение. Я передам ваш вопрос специалисту.',
                'Понял вас. Сейчас уточню детали у специалиста.',
            ];
            const response = operatorResponses[Math.floor(Math.random() * operatorResponses.length)];
            
            addMessage('operator', response);
            
            chatInput.disabled = false;
            chatSendButton.disabled = false;
            chatInput.focus();
        }, 1000 + Math.random() * 1000);
    }
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
