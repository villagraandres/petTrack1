document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('#vaccSubmit').addEventListener('click',add);
    const exampleModal = document.getElementById('exampleModal');
    if(exampleModal){ exampleModal.addEventListener('show.bs.modal',edit)}
   
})



function add(e){
    e.preventDefault()
    const form=document.querySelector('#vaccForm');
    let name=document.querySelector('#vaccname')
    let expiration=document.querySelector('#expiration')
    let application=document.querySelector('#application')
    const vaccid=document.querySelector('#vaccid');
    document.querySelector('#vaccSubmit').disabled=true;

    if(name.value.trim()==''){
        console.log('error');
        return
    }
    if(expiration.value==''){
        console.log('error');
        return
    }
    if(application.value==''){
        console.log('error');
        return
    }

    const info= new FormData(form);
    if(vaccid !==''){
        info.append('vaccid', vaccid.value)
    }
   
    fetch('/api/addvacc',{
        method:'POST',
        body:info
    }).then(message=>{
        window.location.reload();
    })
}

function edit(e){

    const button= e.relatedTarget;
    const name=button.getAttribute('data-name')
    const id=button.getAttribute('data-id')
    const application=button.getAttribute('data-app')
    const expiration=button.getAttribute('data-exp')

    const modalName = exampleModal.querySelector("#vaccname");
    const modalApplication = exampleModal.querySelector("#application");
    const modalExpiration = exampleModal.querySelector("#expiration");
    const vaccid=exampleModal.querySelector('#vaccid');
   

  

   
    if (expiration){    
        var dateObj = new Date(expiration);
        var formattedExp = dateObj.toISOString().split('T')[0];
    }
    
    if (application){    
        var dateObj = new Date(application);
        var formattedApp = dateObj.toISOString().split('T')[0];
    }
    

    modalName.value = name
    modalApplication.value = formattedApp
    modalExpiration.value = formattedExp
    vaccid.value=id
    

}