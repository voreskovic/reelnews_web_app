/**
 * ReelNews AI ChatBot
 * Handles Flowise chat integration with Qdrant parameters
 */

// ── Configuration ──
// Change this to your Flowise instance URL and chatflow ID
const FLOWISE_API_URL = 'http://localhost:3000'; // e.g. https://your-flowise.onrender.com
const CHATFLOW_ID = 'YOUR_CHATFLOW_ID';          // Replace with your actual chatflow ID

document.addEventListener('DOMContentLoaded', function () {
    const collectionInput = document.getElementById('collection-name-input');
    const pointIdInput = document.getElementById('point-id-input');
    const activateBtn = document.getElementById('activate-btn');
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    const chatContainer = document.getElementById('chat-container');

    // Restore saved values
    const savedCollection = localStorage.getItem('collection_name') || '';
    const savedPointId = localStorage.getItem('point_id') || '';
    collectionInput.value = savedCollection;
    pointIdInput.value = savedPointId;

    // Check URL params (override localStorage)
    const params = new URLSearchParams(window.location.search);
    if (params.get('collection_name')) {
        collectionInput.value = params.get('collection_name');
    }
    if (params.get('point_id')) {
        pointIdInput.value = params.get('point_id');
    }

    // Auto-activate if both values present
    if (collectionInput.value && pointIdInput.value) {
        activateChat(collectionInput.value, pointIdInput.value);
    }

    activateBtn.addEventListener('click', function () {
        const collection = collectionInput.value.trim();
        const pointId = pointIdInput.value.trim();

        if (!collection || !pointId) {
            alert('Please enter both Collection Name and Point ID.');
            return;
        }

        localStorage.setItem('collection_name', collection);
        localStorage.setItem('point_id', pointId);

        activateChat(collection, pointId);
    });

    function activateChat(collectionName, pointId) {
        // Update status
        statusDot.classList.add('active');
        statusText.textContent = 'Active';
        activateBtn.textContent = 'ChatBot Active';
        activateBtn.disabled = true;

        // Clear any previous chat
        chatContainer.innerHTML = '';
        chatContainer.classList.add('active');

        // Load Flowise embed script
        const script = document.createElement('script');
        script.type = 'module';
        script.textContent = `
            import Chatbot from 'https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js';
            Chatbot.initFull({
                chatflowid: '${CHATFLOW_ID}',
                apiHost: '${FLOWISE_API_URL}',
                chatflowConfig: {
                    overrideConfig: {
                        collectionName: '${collectionName}',
                        pointId: '${pointId}'
                    }
                },
                theme: {
                    chatWindow: {
                        showTitle: true,
                        title: 'ReelNews Assistant',
                        titleAvatarSrc: '',
                        welcomeMessage: 'Hello! I can answer questions about the selected article cluster. Ask me anything!',
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
        console.log('Chat activated:', { collectionName, pointId });
    }
});
