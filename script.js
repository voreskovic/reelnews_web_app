/**
 * ReelNews AI ChatBot
 * Flowise chat integration
 */

// ── Configuration ──
// Values injected at build time via env-config.js, with localhost fallbacks for dev
const FLOWISE_API_URL = window.__ENV__?.FLOWISE_API_URL || 'http://localhost:3000';
const CHATFLOW_ID = window.__ENV__?.CHATFLOW_ID || 'YOUR_CHATFLOW_ID';

document.addEventListener('DOMContentLoaded', function () {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.classList.add('active');

    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
        import Chatbot from 'https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js';
        Chatbot.initFull({
            chatflowid: '${CHATFLOW_ID}',
            apiHost: '${FLOWISE_API_URL}',
            theme: {
                chatWindow: {
                    showTitle: true,
                    title: 'ReelNews Assistant',
                    titleAvatarSrc: '',
                    welcomeMessage: 'Hello! I can answer questions about articles. Ask me anything!',
                    backgroundColor: '#ffffff',
                    fontSize: 14,
                    poweredByTextColor: '#999999',
                    botMessage: {
                        backgroundColor: '#f0f0f0',
                        textColor: '#000000',
                    },
                    userMessage: {
                        backgroundColor: '#000000',
                        textColor: '#ffffff',
                    },
                    textInput: {
                        placeholder: 'Type your question...',
                        backgroundColor: '#ffffff',
                        textColor: '#000000',
                        sendButtonColor: '#000000',
                    },
                },
            },
        });
    `;

    chatContainer.appendChild(script);
});
