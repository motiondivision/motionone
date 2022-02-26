console.log("loaded editr js");
chrome.devtools.panels.create("Motion Editor", "", "editor.html", function (panel) {
    panel.onShown.addListener(() => {
        console.log("panel shown!");
    });
    panel.onHidden.addListener(() => {
        console.log("panel hidden!");
    });
    console.log("editor loaded here");
    console.log(panel);
    // code invoked on panel creation
});
