var _a;
const script = document.createElement("script");
script.src = chrome.runtime.getURL("js/client.js");
document.documentElement.appendChild(script);
(_a = script.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(script);
const port = chrome.runtime.connect({ name: "client" });
port.onMessage.addListener((message, sender) => {
    console.log("RECEVIED", message, sender);
});
chrome.runtime.onMessage.addListener((message) => {
    console.log("client runtime received mesage", message);
    window.postMessage(message);
});
window.addEventListener("message", (event) => {
    // We only accept messages from ourselves
    if (event.source != window)
        return;
    if (event.data.type === "animation_start") {
        console.log("Content script received: ", event.data);
        port.postMessage(event.data);
    }
}, false);
