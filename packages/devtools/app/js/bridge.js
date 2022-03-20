(function () {
    'use strict';

    var _a;
    window.__MOTION_BRIDGE_HAS_LOADED = true;
    /**
     * Inject client script into the actual webpage
     */
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("js/client.js");
    document.documentElement.appendChild(script);
    (_a = script.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(script);
    /**
     * Locally store tabs already recording at page load - this
     * will be used to record animations occuring on page load
     */
    let recordingTabsAtLoad = {};
    chrome.storage.sync.get("recordingTabs", ({ recordingTabs }) => {
        recordingTabsAtLoad = recordingTabs;
    });
    /**
     * Connect and track port to the background script
     */
    let backgroundPort;
    function connect() {
        backgroundPort = chrome.runtime.connect({ name: "client" });
        /**
         * Messages background script => web page
         */
        backgroundPort.onMessage.addListener((backgroundMessage) => {
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
                    return;
                }
                case "isrecording":
                case "inspectanimation":
                case "scrubanimation": {
                    window.postMessage(backgroundMessage, "*");
                    return;
                }
            }
        });
        backgroundPort.onDisconnect.addListener(() => {
            backgroundPort = undefined;
        });
    }
    connect();
    /**
     * Messages web page => background script
     */
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
