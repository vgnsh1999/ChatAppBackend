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