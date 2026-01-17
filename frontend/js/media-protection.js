// Media Protection Script
// Prevents browser tools and context menu for images and videos

document.addEventListener('DOMContentLoaded', () => {
    // Disable context menu for all images and videos
    const disableContextMenu = (e) => {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
            e.preventDefault();
            return false;
        }
    };

    // Disable drag for all images and videos
    const disableDrag = (e) => {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
            e.preventDefault();
            return false;
        }
    };

    // Disable right-click context menu
    document.addEventListener('contextmenu', disableContextMenu, true);

    // Disable drag start
    document.addEventListener('dragstart', disableDrag, true);

    // Disable select start on images and videos
    document.addEventListener('selectstart', (e) => {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
            e.preventDefault();
            return false;
        }
    }, true);

    // Apply attributes to existing images
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('draggable', 'false');
        img.setAttribute('oncontextmenu', 'return false;');
        img.addEventListener('contextmenu', (e) => e.preventDefault());
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    // Apply attributes to existing videos
    document.querySelectorAll('video').forEach(video => {
        video.setAttribute('draggable', 'false');
        video.setAttribute('oncontextmenu', 'return false;');
        video.addEventListener('contextmenu', (e) => e.preventDefault());
        video.addEventListener('dragstart', (e) => e.preventDefault());
    });

    // Monitor for dynamically added images and videos
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    if (node.tagName === 'IMG' || node.tagName === 'VIDEO') {
                        node.setAttribute('draggable', 'false');
                        node.setAttribute('oncontextmenu', 'return false;');
                        node.addEventListener('contextmenu', (e) => e.preventDefault());
                        node.addEventListener('dragstart', (e) => e.preventDefault());
                    }
                    // Check child images and videos
                    node.querySelectorAll && node.querySelectorAll('img, video').forEach(media => {
                        media.setAttribute('draggable', 'false');
                        media.setAttribute('oncontextmenu', 'return false;');
                        media.addEventListener('contextmenu', (e) => e.preventDefault());
                        media.addEventListener('dragstart', (e) => e.preventDefault());
                    });
                }
            });
        });
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
