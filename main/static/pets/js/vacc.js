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
    console.log(info);
   
    fetch('/api/addvacc',{
        method:'POST',
        body:info
    }).then(message=>{
        window.location.reload();
    })
    console.log('success');
}

function edit(e){
    const button = event.relatedTarget
    // Extract info from data-bs-* attributes
    const recipient = button.getAttribute('data-bs-whatever')
    // If necessary, you could initiate an Ajax request here
    // and then do the updating in a callback.

    // Update the modal's content.
    const modalTitle = exampleModal.querySelector('.modal-title')
    const modalBodyInput = exampleModal.querySelector('.modal-body input')

    modalTitle.textContent = `New message to ${recipient}`
    modalBodyInput.value = recipient

}