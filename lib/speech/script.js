let speechInterval;

function onSpeechStart() {
    const objectHtml = document.querySelector("object");
    const objectHtmlDoc = objectHtml.contentWindow.document;
    const textInput = objectHtmlDoc.querySelector("input.txt");
    const form = objectHtmlDoc.querySelector("form");
    const rate = objectHtmlDoc.querySelector('#rate');
    const voiceSelect = objectHtmlDoc.querySelector('select');

    const text = "Beware of Javascript Shenanigans!";
    const regularDelay = 100;
    const blankDelay = 200;

    let textDelay = 0;
    let rateDelay = 0;
    for (let i = 0; i < text.length; i++) {
        textDelay += text.charAt(i) === " " ? blankDelay : regularDelay;
        setTimeout(function() {
            textInput.value = text.slice(0, i + 1);
        }, textDelay);
    }
    for (let i = 1; i > 0.5; i -= 0.1) {
        rateDelay += 200;
        setTimeout(function() {
            rate.value = i;
            rate.dispatchEvent(new Event("change"));
        }, rateDelay);
    }
    setTimeout(function() {
        speechInterval = setInterval(function() {
            form.dispatchEvent(new Event("submit"));
            const nextIndex = voiceSelect.selectedIndex + 1;
            voiceSelect.options[nextIndex % voiceSelect.options.length].selected = true;
            voiceSelect.dispatchEvent(new Event("change"));
        }, 6000);
    }, textDelay + 200)
}

function onSpeechStop() {
    console.log(speechInterval);
    clearInterval(speechInterval);
    const objectHtml = document.querySelector("object");
    const objectHtmlDoc = objectHtml.contentWindow.document;
    const textInput = objectHtmlDoc.querySelector("input.txt");
    textInput.value = "";
}