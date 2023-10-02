document.addEventListener('DOMContentLoaded',()=>{
    verificate()
    disable()
})



function verificate(){
    const email= document.querySelector('#inputEmail');
    const name=document.querySelector('#name');
    const password=document.querySelector('#password');
    const password2=document.querySelector('#password2');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    name.addEventListener('blur',()=>{
         if (name.value.trim()==''){
            name.classList.add('border','border-danger')
            }else{
            name.classList.remove('border','border-danger')
            }
            disable()
    })
    password.addEventListener('blur',()=>{
        if (password.value.trim()=='' || password.value.length<8){
            password.classList.add('border','border-danger')
        }else{
            password.classList.remove('border','border-danger')
        }
        disable()

    })
    password2.addEventListener('input',()=>{
        if (password2.value.trim()==''){
            password2.classList.add('border','border-danger')
        }else{
            password2.classList.remove('border','border-danger')
        }
        disable()
    })

    email.addEventListener('blur',()=>{
       if (email.value.trim()=='' || !emailRegex.test(email.value)){
              email.classList.add('border','border-danger')
       }else{
              email.classList.remove('border','border-danger')
       }
       disable()

    })

   
}

function disable(){
 const inputs=document.querySelectorAll('input')
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const email= document.querySelector('#inputEmail');

 for(let i=0; i<inputs.length;i++){
    if(inputs[i].value.trim()=='' || !emailRegex.test(email.value) ){
        document.querySelector('#submitForm').disabled=true;
        document.querySelector('#submitForm').classList.add('disable');
        break;
    }else{
        document.querySelector('#submitForm').disabled=false;
        document.querySelector('#submitForm').classList.remove('disable');
    }
 }
}

