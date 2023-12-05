
document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('#petSubmit').addEventListener('click',addPet)
    
})
function addPet(e){
    e.preventDefault()
    const form=document.querySelector('form');
    const inputs=form.querySelectorAll('input');
    const selects=form.querySelectorAll('select')
    const fileInput = document.getElementById('fileInput');
    const weight=document.querySelector('#weight').value;
    const file = fileInput.files[0];
    document.querySelector('#petSubmit').disabled=true;
   
    if(!verify(inputs,selects)){
        return
    }
    if(weight<0){
        document.querySelector('#petAlert').classList.add('d-block');
        document.querySelector('#petAlert').classList.remove('d-none');
        document.querySelector('#petSubmit').disabled=false;
        setTimeout(() => {
          document.querySelector('#petAlert').classList.remove('d-block');
          document.querySelector('#petAlert').classList.add('d-none');
        }, 1000);
        return
    }
    
   const info=new FormData(form)
   info.append('file', file);
   fetch('/api/addPet', {
    method: 'POST',
    body: info
  }).then(message=>{
    window.location.reload();
  })
   
    
}


function verify(inputs,selects){
    for(let i=0;i<inputs.length;i++){
        if(inputs[i].value.trim()==''){
          document.querySelector('#petAlert').classList.add('d-block');
          document.querySelector('#petAlert').classList.remove('d-none');
          document.querySelector('#petSubmit').disabled=false;
          setTimeout(() => {
            document.querySelector('#petAlert').classList.remove('d-block');
            document.querySelector('#petAlert').classList.add('d-none');
          }, 1000);
         return false;
        }
    } 
    for(let i=0;i<selects.length;i++){
        if(selects[i].value.trim()==''){     
            document.querySelector('#petAlert').classList.add('d-block');
            document.querySelector('#petAlert').classList.remove('d-none');
            document.querySelector('#petSubmit').disabled=false;
            setTimeout(() => {
              document.querySelector('#petAlert').classList.remove('d-block');
              document.querySelector('#petAlert').classList.add('d-none');
            }, 1000);
            return false;
        }
    }
    return true;
}