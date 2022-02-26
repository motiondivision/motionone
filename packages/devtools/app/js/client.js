const events = {
    animationStart: "animation_start",
};

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
        record: (element, name, keyframes, options) => {
            if (!client.isRecording)
                return;
            window.postMessage({
                type: events.animationStart,
                elementId: generateElementId(element),
                name,
                keyframes,
                options,
            }, "*");
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
        console.log(event.data);
        if (event.data.type === "recording") {
            if (event.data.isRecording) {
                startRecording();
            }
            else {
                stopRecording();
            }
        }
    });
    return client;
}
if (!window.__MOTION_DEV_TOOLS) {
    window.__MOTION_DEV_TOOLS = createDevToolsClient();
}
