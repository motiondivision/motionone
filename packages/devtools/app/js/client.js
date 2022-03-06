(() => {
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
    let animations = {};
    let animationCount = 1;
    let isFlushScheduled = false;
    function flushBuffer() {
        const message = {
            type: "animationstart",
            animations: animations,
        };
        console.log("flushing animations", animations);
        window.postMessage(message, "*");
        isFlushScheduled = false;
        animations = {};
        animationCount++;
    }
    function createDevToolsClient() {
        const client = {
            isRecording: false,
            record: (element, valueName, keyframes, options) => {
                console.log("attempting to record", client.isRecording);
                if (!client.isRecording)
                    return;
                const animationName = `Animation ${animationCount}`;
                const elementId = generateElementId(element);
                if (!animations[animationName]) {
                    animations[animationName] = {};
                }
                if (!animations[animationName][elementId]) {
                    animations[animationName][elementId] = [];
                }
                animations[animationName][elementId].push({
                    elementId,
                    animationName,
                    valueName,
                    keyframes,
                    options,
                });
                if (!isFlushScheduled) {
                    isFlushScheduled = true;
                    requestAnimationFrame(flushBuffer);
                }
            },
        };
        function startRecording() {
            animationCount = 1;
            animations = {};
            client.isRecording = true;
        }
        function stopRecording() {
            client.isRecording = false;
        }
        console.log("adding window message event listener");
        window.addEventListener("message", (event) => {
            console.log("receiving event", event.data);
            if (event.source !== window)
                return;
            console.log(event.data.type);
            if (event.data.type === "isrecording") {
                event.data.isRecording ? startRecording() : stopRecording();
            }
        });
        window.postMessage({ type: "clientready" }, "*");
        return client;
    }
    if (!window.__MOTION_DEV_TOOLS) {
        window.__MOTION_DEV_TOOLS = createDevToolsClient();
    }
})();
