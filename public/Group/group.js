async function addGroup(event){
    try{
        event.preventDefault();
        const obj = {
            groupname:event.target.groupname.value
        };
        const token = localStorage.getItem('token');
        const response = await axios.post('http://54.159.107.122:3000/group/add-group',obj,{headers:{"Authorization":token}});
        // console.log(response.data.allChats);
        showGroupOnScreen(response.data.allGroups);
    } catch(error){
        console.log(error);
        //document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong!</h4>';
        document.body.innerHTML = document.body.innerHTML + `<div style="color:red";>${error}</div>`
    }
}

function showGroupOnScreen(obj){
    const parentElement = document.getElementById('groups');
    const childElement = `<li id=${obj.id}>${obj.groupname} 
    <button onclick="joinedgroup(${obj.id})" class="btn btn-success">Join Group</button>
    </li>`
    parentElement.innerHTML = parentElement.innerHTML + childElement;
}


function joinedgroup(id){
        localStorage.setItem('groupId',JSON.stringify(id));
        window.location.href = "../Chatapp/chatapp.html";
}

window.addEventListener("DOMContentLoaded",async()=>{
    try{
        const token = localStorage.getItem('token');
        const response = await axios.get('http://54.159.107.122:3000/group/get-group',{headers:{"Authorization":token}});
        console.log(response.data);
        for(var i=0;i<response.data.allGroups.length;i++){
        showGroupOnScreen(response.data.allGroups[i]);
        }
    } catch(error){
        console.log(error);
        //document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong!</h4>';
        document.body.innerHTML = document.body.innerHTML + `<div style="color:red";>${error}</div>`
    }
});