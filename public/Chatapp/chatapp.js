async function addMessage(event){
    try{
        event.preventDefault();
        const obj = {
            message:event.target.message.value
        };
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/message/add-message',obj,{headers:{"Authorization":token}});
        console.log(response.data.allChats);
        showChatOnScreen(response.data.allChats);
        storeChatOnLocalStorage(response.data.allChats);
    } catch(error){
        console.log(error);
        //document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong!</h4>';
        document.body.innerHTML = document.body.innerHTML + `<div style="color:red";>${error}</div>`
    }
}

//---------------------------LOCALSTORAGE-------------------------------------
//to store data in localstorage
function storeChatOnLocalStorage(obj){
    const localStorageContent = localStorage.getItem('messages');
    let messages;
    if(localStorageContent === null){
        messages = [];
    } else {
        messages = JSON.parse(localStorageContent);
    }
    messages.push(obj);
    localStorage.setItem('messages',JSON.stringify(messages));
    //console.log(localStorageContent);
}

//For optimization we use localstorage and show only 10 chats
window.addEventListener("DOMContentLoaded", showChatOnScreenFromLocalStorage);
//get messages from localstorage
function getMessagesFromLocalStorage(){
    let messages;
    const messagesLS = localStorage.getItem('messages');
    if(messagesLS === null){
        messages = [];
    } else {
        messages = JSON.parse(messagesLS);
    }
    return messages;
}

function showChatOnScreenFromLocalStorage(){
    let messages = getMessagesFromLocalStorage();
    console.log(messages[0])
    console.log(messages.length)
    //console.log(messages.shift());

    //retrieve from localstorage and display
    // messages.forEach(message =>{
    //     const parentElement = document.getElementById('chats');
    //     const childElement = `<tr id=${message.userId}><td>${message.username}: ${message.message}</td></tr>`
    //     parentElement.innerHTML = parentElement.innerHTML + childElement;  
    // });
    
    removeChatFromLocalStorage();
}

function removeChatFromLocalStorage(){
    let messages = getMessagesFromLocalStorage();
    if(messages === undefined || messages.length === 0){
        messages = [];
    }
    if(messages.length > 10){
        messages = messages.shift();
    }
    localStorage.setItem('messages',JSON.stringify(messages));
}

// ------------------LOCALSTORAGE ENDS HERE---------------------//

function showChatOnScreen(obj){
    const parentElement = document.getElementById('chats');
    const childElement = `<tr id=${obj.userId}><td>${obj.username}: ${obj.message}</td></tr>`
    parentElement.innerHTML = parentElement.innerHTML + childElement;   
}



function displayUsersOnScreen(obj){
        const parentElement = document.getElementById('users');
        const childElement = `<tr id=${obj.id}><td>${obj.username} joined</td></tr>`
        parentElement.innerHTML = parentElement.innerHTML + childElement;   
}

window.addEventListener("DOMContentLoaded",async()=>{
    try{
        const response = await axios.get('http://localhost:3000/user/get-user');
        console.log(response.data);
        for(var i=0;i<response.data.allUsers.length;i++){
        displayUsersOnScreen(response.data.allUsers[i]);
        }
    } catch(error){
        console.log(error);
        //document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong!</h4>';
        document.body.innerHTML = document.body.innerHTML + `<div style="color:red";>${error}</div>`
    }
});

//we are going to get data of 10 chats from local storage so we get new messages from this
window.addEventListener("DOMContentLoaded",async()=>{
    try{
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/message/get-message?limit=10',{headers:{"Authorization":token}});
            for(var i=0;i<response.data.allChats.length;i++){
            showChatOnScreen(response.data.allChats[i]);
        }
    } catch(error){
        console.log(error);
        //document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong!</h4>';
        //document.body.innerHTML = document.body.innerHTML + `<div style="color:red";>${error}</div>`
    }
});

window.addEventListener("DOMContentLoaded",async()=>{
    try{
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/message/get-message2?limit=10',{headers:{"Authorization":token}});
            for(var i=0;i<response.data.allChats.length;i++){
            showChatOnScreen(response.data.allChats[i]);
        }
    } catch(error){
        console.log(error);
        //document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong!</h4>';
        //document.body.innerHTML = document.body.innerHTML + `<div style="color:red";>${error}</div>`
    }
});

setInterval(()=>{
    window.location.reload()
 }, 8000);