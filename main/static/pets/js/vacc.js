document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('#vaccSubmit').addEventListener('click',add);
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