async function signUp(event){
    try{
        event.preventDefault();
        const obj = {
            username:event.target.username.value,
            email:event.target.email.value,
            phonenumber:event.target.phonenumber.value,
            password:event.target.password.value
        }
        localStorage.setItem('email',obj.email);
        const response = await axios.post('http://localhost:3000/user/signup',obj);
        if(response.status === 201){
          window.location.href = "../Login/login.html";
          alert('Successfuly signed up');
        } 
        else {
          throw new Error('Failed to login');
        }
    } catch(error){
        console.log(error);
        //document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong!</h4>';
        document.body.innerHTML = document.body.innerHTML + `<div style="color:red";>${error}</div>`
    }
}