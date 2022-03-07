(() => {
    var _a;
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("js/client.js");
    document.documentElement.appendChild(script);
    (_a = script.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(script);
    let recordingTabsAtLoad = {};
    chrome.storage.sync.get("recordingTabs", ({ recordingTabs }) => {
        recordingTabsAtLoad = recordingTabs;
    });
    let backgroundPort;
    function connect() {
        backgroundPort = chrome.runtime.connect({ name: "client" });
        backgroundPort.onDisconnect.addListener(() => {
            backgroundPort = undefined;
        });
    }
    connect();
    backgroundPort === null || backgroundPort === void 0 ? void 0 : backgroundPort.onMessage.addListener((backgroundMessage) => {
        switch (backgroundMessage.type) {
            case "tabId": {
                const { tabId } = backgroundMessage;
                if (!recordingTabsAtLoad || !recordingTabsAtLoad[tabId])
                    return;
                const message = {
                    type: "isrecording",
                    isRecording: true,
                    tabId,
                };
                window.postMessage(message, "*");
            }
        }
    });
    chrome.runtime.onMessage.addListener((message) => {
        window.postMessage(message, "*");
    });
    const handleMessages = (event) => {
        if (event.source != window)
            return;
        if (!backgroundPort)
            connect();
        switch (event.data.type) {
            /**
             * Events from client to backend
             */
            case "animationstart":
            case "clientready":
            case "login": {
                backgroundPort.postMessage(event.data);
                return;
            }
        }
    };
    window.addEventListener("message", handleMessages, false);
})();
