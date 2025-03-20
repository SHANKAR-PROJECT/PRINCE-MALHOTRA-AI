let prompt = document.querySelector("#prompt");
let submitbtn = document.querySelector("#submit");
let chatContainer = document.querySelector(".chat-container");

const Api_Url = "https://shankar-gpt-3-api.vercel.app/api?message=";

let user = {
    message: null
};

async function generateResponse(aiChatBox) {
    let text = aiChatBox.querySelector(".ai-chat-area");

    try {
        let response = await fetch(Api_Url + encodeURIComponent(user.message));
        let data = await response.json();
        
        // Fix: API के सही response format को हैंडल कर रहे हैं
        if (data.status && data.response) {
            text.innerHTML = data.response; 
        } else {
            text.innerHTML = "⚠️ एरर: API से सही जवाब नहीं आया!";
        }
    } 
    catch (error) {
        console.log(error);
        text.innerHTML = "⚠️ एरर: कुछ गड़बड़ हो गई, बाद में कोशिश करें!";
    } 
    finally {
        chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
    }
}

function createChatBox(html, classes) {
    let div = document.createElement("div");
    div.innerHTML = html;
    div.classList.add(classes);
    return div;
}

function handlechatResponse(userMessage) {
    user.message = userMessage;

    let html = `<img src="user.png" alt="" id="userImage" width="8%">
    <div class="user-chat-area">${user.message}</div>`;

    prompt.value = "";
    let userChatBox = createChatBox(html, "user-chat-box");
    chatContainer.appendChild(userChatBox);
    
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });

    setTimeout(() => {
        let html = `<img src="ai.png" alt="" id="aiImage" width="10%">
        <div class="ai-chat-area">
        <img src="loading.webp" alt="" class="load" width="50px">
        </div>`;
        let aiChatBox = createChatBox(html, "ai-chat-box");
        chatContainer.appendChild(aiChatBox);
        generateResponse(aiChatBox);
    }, 600);
}

prompt.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        handlechatResponse(prompt.value);
    }
});

submitbtn.addEventListener("click", () => {
    handlechatResponse(prompt.value);
});
