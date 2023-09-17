document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({ action: 'getLatestShortenedURL' }, (response) => {
        if (response && response.url) {
            document.getElementById('url').textContent = response.url;
        } else {
            document.getElementById('url').textContent = "Error generating URL.";
        }
    });
});