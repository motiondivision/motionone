let elementCounter = 0;
function generateElementId(element) {
    let id = element.dataset.motionId || element.id;
    if (!id) {
        elementCounter++;
        id = element.tagName.toLowerCase() + " " + elementCounter;
        element.dataset.motionId = id;
    }
    return id;
}
function createDevToolsClient() {
    const client = {
        isRecording: false,
        record: (element, valueName, keyframes, options) => {
            if (!client.isRecording)
                return;
            const message = {
                type: "animationstart",
                elementId: generateElementId(element),
                valueName,
                keyframes,
                options,
            };
            window.postMessage(message, "*");
        },
    };
    function startRecording() {
        client.isRecording = true;
    }
    function stopRecording() {
        client.isRecording = false;
    }
    window.addEventListener("message", (event) => {
        if (event.source !== window)
            return;
        if (event.data.type === "isrecording") {
            event.data.isRecording ? startRecording() : stopRecording();
        }
    });
    return client;
}
if (!window.__MOTION_DEV_TOOLS) {
    window.__MOTION_DEV_TOOLS = createDevToolsClient();
}
