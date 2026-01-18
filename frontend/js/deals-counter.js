// Deals Counter Script
let dealsCounter = null;
let currentCount = 31313;
let incrementInterval = null;

// Initialize deals counter
function initDealsCounter() {
    // Create counter element
    dealsCounter = document.createElement('div');
    dealsCounter.className = 'deals-counter';
    dealsCounter.innerHTML = `
        <div class="deals-counter-content">
            <div class="deals-counter-label">Успешных сделок</div>
            <div class="deals-counter-number" id="dealsCounterNumber">${formatNumber(currentCount)}</div>
        </div>
    `;

    // Append to body
    document.body.appendChild(dealsCounter);

    // Start incrementing counter
    startCounter();
}

// Format number with spaces
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Update counter with animation
function updateCounter() {
    const counterElement = document.getElementById('dealsCounterNumber');
    if (!counterElement) return;

    const oldValue = currentCount;
    currentCount += 1;
    const newValue = currentCount;

    // Create animation effect
    counterElement.style.transform = 'scale(1.1)';
    counterElement.style.opacity = '0.7';

    setTimeout(() => {
        counterElement.textContent = formatNumber(newValue);
        counterElement.style.transform = 'scale(1)';
        counterElement.style.opacity = '1';
    }, 150);
}

// Start counter increment
function startCounter() {
    if (incrementInterval) {
        clearInterval(incrementInterval);
    }

    incrementInterval = setInterval(() => {
        updateCounter();
    }, 10000); // 10 seconds
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initDealsCounter();
});
