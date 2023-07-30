async function addMessage(event){
    try{
        event.preventDefault();
        const obj = {
            message:event.target.message.value
        };
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/message/add-message',obj,{headers:{"Authorization":token}});
            showChatOnScreen(response.data.allChats);
    } catch(error){
        console.log(error);
        //document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong!</h4>';
        document.body.innerHTML = document.body.innerHTML + `<div style="color:red";>${error}</div>`
    }
}

function showChatOnScreen(obj){
    const parentElement = document.getElementById('chats');
    const childElement = `<tr id=${obj.userId}><td>${obj.username}: ${obj.message}</td></tr>`
    parentElement.innerHTML = parentElement.innerHTML + childElement;   
}



function displayUsersOnScreen(obj){
        const parentElement = document.getElementById('chats');
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

window.addEventListener("DOMContentLoaded",async()=>{
    try{
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/message/get-message',{headers:{"Authorization":token}});
        for(var i=0;i<response.data.allChats.length;i++){
        showChatOnScreen(response.data.allChats[i]);
        }
    } catch(error){
        console.log(error);
        //document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong!</h4>';
        document.body.innerHTML = document.body.innerHTML + `<div style="color:red";>${error}</div>`
    }
});