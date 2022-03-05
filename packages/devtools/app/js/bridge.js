var _a;
const script = document.createElement("script");
script.src = chrome.runtime.getURL("js/client.js");
document.documentElement.appendChild(script);
(_a = script.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(script);
let port;
function connect() {
    port = chrome.runtime.connect({ name: "client" });
    port.onDisconnect.addListener(() => {
        port = undefined;
    });
}
connect();
// port.onMessage.addListener(() => {
//   /**
//    * Receive message from port - replace runtime.listener with this
//    */
// })
chrome.runtime.onMessage.addListener((message) => {
    window.postMessage(message, "*");
});
window.addEventListener("message", (event) => {
    if (event.source != window)
        return;
    if (!port)
        connect();
    switch (event.data.type) {
        /**
         * Events from client to backend
         */
        case "animationstart": {
            port.postMessage(event.data);
            return;
        }
    }
}, false);
