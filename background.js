const BITLY_API_URL = 'https://api-ssl.bitly.com/v4/shorten';
const BITLY_API_TOKEN = '20cfcef2128eca4ecdfb47333a61113728919e6f'; 

let latestShortenedURL = "";

chrome.contextMenus.create({
    id: "shortenURL",
    title: "Shorten URL",
    contexts: ["page"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "shortenURL") {
        shortenURL(tab.url);
    }
});

function shortenURL(url) {
    fetch(BITLY_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${BITLY_API_TOKEN}`
        },
        body: JSON.stringify({
            long_url: url
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.id) {
            latestShortenedURL = data.id;
        }
    })
    .catch(error => {
        console.error('Error shortening URL:', error);
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getLatestShortenedURL') {
        sendResponse({ url: latestShortenedURL });
    }
});