async function addMessage(event){
    try{
        event.preventDefault();
        const obj = {
            message:event.target.message.value
        };
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('groupId');
        const response = await axios.post(`http://54.159.107.122:3000/message/add-message/${id}`,obj,{headers:{"Authorization":token}});
        console.log(response.data.allChats);
        showChatOnScreen(response.data.allChats);
        //storeChatOnLocalStorage(response.data.allChats);
    } catch(error){
        console.log(error);
        //document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong!</h4>';
        document.body.innerHTML = document.body.innerHTML + `<div style="color:red";>${error}</div>`
    }
}

async function addMember(event){
    try{
        event.preventDefault();
        const obj = {
            member:event.target.member.value
        };
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('groupId');
        const response = await axios.post(`http://54.159.107.122:3000/member/add-member/${id}`,obj,{headers:{"Authorization":token}});
        console.log(response.data.allMembers);
        showMemberOnScreen(response.data.allMembers)
    } catch(error){
        console.log(error);
        //document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong!</h4>';
        document.body.innerHTML = document.body.innerHTML + `<div style="color:red";>${error}</div>`
    }
}

//---------------------------LOCALSTORAGE-------------------------------------
//to store data in localstorage
// function storeChatOnLocalStorage(obj){
//     const localStorageContent = localStorage.getItem('messages');
//     let messages;
//     if(localStorageContent === null){
//         messages = [];
//     } else {
//         messages = JSON.parse(localStorageContent);
//     }
//     messages.push(obj);
//     localStorage.setItem('messages',JSON.stringify(messages));
//     //console.log(localStorageContent);
// }

// //For optimization we use localstorage and show only 10 chats
// window.addEventListener("DOMContentLoaded", showChatOnScreenFromLocalStorage);
// //get messages from localstorage
// function getMessagesFromLocalStorage(){
//     let messages;
//     const messagesLS = localStorage.getItem('messages');
//     if(messagesLS === null){
//         messages = [];
//     } else {
//         messages = JSON.parse(messagesLS);
//     }
//     return messages;
// }

// function showChatOnScreenFromLocalStorage(){
//     let messages = getMessagesFromLocalStorage();
//     console.log(messages[0])
//     console.log(messages.length)
//     //console.log(messages.shift());

//     //retrieve from localstorage and display
//     // messages.forEach(message =>{
//     //     const parentElement = document.getElementById('chats');
//     //     const childElement = `<tr id=${message.userId}><td>${message.username}: ${message.message}</td></tr>`
//     //     parentElement.innerHTML = parentElement.innerHTML + childElement;  
//     // });

//     removeChatFromLocalStorage();
// }

// function removeChatFromLocalStorage(){
//     let messages = getMessagesFromLocalStorage();
//     if(messages === undefined || messages.length === 0){
//         messages = [];
//     }
//     if(messages.length > 10){
//         messages = messages.shift();
//     }
//     localStorage.setItem('messages',JSON.stringify(messages));
// }


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
        
        const parentElement1 = document.getElementById('groupadmins');
        const childElement1 = `<li id=${obj.id}>${obj.username}</li>`
        parentElement1.innerHTML = parentElement1.innerHTML + childElement1;
}

function displayAdminsOnScreen(obj){
    const parentElement1 = document.getElementById('groupadmins');
    const childElement1 = `<li id=${obj.id}>${obj.membername}</li>`
    parentElement1.innerHTML = parentElement1.innerHTML + childElement1;
}

function showMemberOnScreen(obj){
    const parentElement = document.getElementById('users');
    const childElement = `<tr id=${obj.id}><td>${obj.membername} joined
    <button class="btn btn-danger btn-sm" onclick="deleteMember(${obj.id})">Delete Member</button>
    <button id="admin" class="btn btn-secondary btn-sm" onclick="makeAdmin(${obj.id})">Make Admin</button>
    <p id="adminmessage"></p>
    </td>
    </tr>`
    parentElement.innerHTML = parentElement.innerHTML + childElement;   
}

async function deleteMember(id){
    try{
        const token = localStorage.getItem('token');
        await axios.delete(`http://54.159.107.122:3000/member/delete-member/${id}`,{headers:{"Authorization":token}});
        removeMemberFromScreen(id);
    } catch(error){
        console.log(error);
        document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong!</h4>'
    }
}

function removeMemberFromScreen(id){
    document.getElementById(id).remove();
}

async function makeAdmin(id){
    try{
        const token = localStorage.getItem('token');
        await axios.put(`http://54.159.107.122:3000/member/make-admin/${id}`,{headers:{"Authorization":token}});
        removeAdminButton();
        displayOnGroupAdmins();
    } catch(error){
        console.log(error);
        document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong!</h4>'
    }
}

function removeAdminButton(){
                document.getElementById('admin').remove();
}

async function displayOnGroupAdmins(){
    try{
            const token = localStorage.getItem('token');
            const id = localStorage.getItem('groupId');
            const response = await axios.get(`http://54.159.107.122:3000/member/get-member`,{headers:{"Authorization":token}});
            for(var i=0;i<response.data.allMembers.length;i++){
                if(response.data.allMembers[i].isAdmin === true){
                    displayAdminsOnScreen(response.data.allMembers[i]);
                }
            }
    } catch(error){
        console.log(error);
        //document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong!</h4>';
        //document.body.innerHTML = document.body.innerHTML + `<div style="color:red";>${error}</div>`
    }
};

window.addEventListener("DOMContentLoaded",async()=>{
    try{
        const token = localStorage.getItem('token');
        const response = await axios.get('http://54.159.107.122:3000/user/get-user',{headers:{"Authorization":token}});
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
// window.addEventListener("DOMContentLoaded",async()=>{
//     try{
//             const token = localStorage.getItem('token');
//             const id = localStorage.getItem('groupId');
//             const response = await axios.get(`http://54.159.107.122:3000/message/get-message/:${id}?limit=10`,{headers:{"Authorization":token}});
//             for(var i=0;i<response.data.allChats.length;i++){
//             showChatOnScreen(response.data.allChats[i]);
//         }
//     } catch(error){
//         console.log(error);
//         //document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong!</h4>';
//         //document.body.innerHTML = document.body.innerHTML + `<div style="color:red";>${error}</div>`
//     }
// });

window.addEventListener("DOMContentLoaded",async()=>{
    try{
            const token = localStorage.getItem('token');
            const id = localStorage.getItem('groupId');
            const response = await axios.get(`http://54.159.107.122:3000/message/get-message/${id}`,{headers:{"Authorization":token}});
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
            const id = localStorage.getItem('groupId');
            const response = await axios.get(`http://54.159.107.122:3000/member/get-member/${id}`,{headers:{"Authorization":token}});
            for(var i=0;i<response.data.allMembers.length;i++){
            showMemberOnScreen(response.data.allMembers[i]);
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
            const id = localStorage.getItem('groupId');
            const response = await axios.get(`http://54.159.107.122:3000/member/get-member`,{headers:{"Authorization":token}});
            for(var i=0;i<response.data.allMembers.length;i++){
                if(response.data.allMembers[i].isAdmin === true){
                    removeAdminButton()
                    displayAdminsOnScreen(response.data.allMembers[i]);
                }
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