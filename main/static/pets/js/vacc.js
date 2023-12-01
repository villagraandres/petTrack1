document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('#vaccSubmit').addEventListener('click',add);
    const exampleModal = document.getElementById('exampleModal');
    if(exampleModal){ exampleModal.addEventListener('show.bs.modal',edit)}
    document.querySelectorAll('.deleteBtns').forEach(btn=>{
        btn.addEventListener('click',()=>{
            deleteVacc(btn.dataset.id)
        })
    })
   
})



function add(e){
    e.preventDefault()
    const form=document.querySelector('#vaccForm');
    let name=document.querySelector('#vaccname')
    let expiration=document.querySelector('#expiration')
    let application=document.querySelector('#application')
    const vaccid=document.querySelector('#vaccid').value;
    document.querySelector('#vaccSubmit').disabled=true;
    
    const vaccSubmit=exampleModal.querySelector('#vaccSubmit');
    const label=exampleModal.querySelector('#modalLabel');
    vaccSubmit.textContent="Add"
    label.textContent="Add Vaccination"
    

   
    let errors = [];
    if(name.value.trim()==''){
        document.querySelector('#vaccSubmit').disabled=false;
        errors.push(name);
    }
    if(expiration.value==''){
        document.querySelector('#vaccSubmit').disabled=false;
        errors.push(expiration);
    }
    if(application.value==''){
        document.querySelector('#vaccSubmit').disabled=false;
       errors.push(application)
    }

    if (errors.length > 0) {
        handleErrors(errors);
        return; // Detiene el flujo si hay errores
    }


    const info= new FormData(form);
    if(vaccid !==''){
        console.log('entro');
        info.append('vaccid', vaccid)
    }
   
    fetch('/api/addvacc',{
        method:'POST',
        body:info
    }).then(message=>{
      
          Swal.fire(
            'The vaccine was created succesfully',
            '',
            'success'
          )
        
        setTimeout(() => {
            window.location.reload();
          }, 1500);
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
    const label=exampleModal.querySelector('#modalLabel');
    if (id!==null){
        const vaccSubmit=exampleModal.querySelector('#vaccSubmit');
        vaccSubmit.textContent="Update"
        label.textContent="Update Vaccination"
    }else{
        const vaccSubmit=exampleModal.querySelector('#vaccSubmit');
        vaccSubmit.textContent="Add"
        label.textContent="Add Vaccination"
    }
      
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

function deleteVacc(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

            fetch('/api/delete',{
                method:'POST',
                body:JSON.stringify({id:id})
            })
            .then(response=>response.json)
            .then(message=>{
                Swal.fire(
                    'Deleted!',
                    'The Vaccine has been deleted.',
                    'success'
                  )
            })

            setTimeout(() => {
                window.location.reload();
              }, 1500);

         
        }
      })
}


function handleErrors(inputs) {
    inputs.forEach(input => {
        input.classList.add('border', 'border-danger');
        setTimeout(() => {
            input.classList.remove('border', 'border-danger');
        }, 2000);
    });
}