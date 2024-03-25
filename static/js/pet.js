
document.addEventListener('DOMContentLoaded',()=>{
    console.log("i am here")
    document.querySelector('#petSubmit').addEventListener('click',addPet)
    const editButtons = document.querySelectorAll('.editPet');
  editButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault(); // Detiene el comportamiento predeterminado del enlace
    });
  });

  const exampleModal = document.getElementById('exampleModal');

  if(exampleModal){ exampleModal.addEventListener('show.bs.modal',edit)}


  document.querySelectorAll('.deletePet').forEach(btn=>{
      btn.addEventListener('click',function(e){
        e.preventDefault();
        deletePet(btn.dataset.id)
      })
  })




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

    const petId=document.querySelector('#petid').value;
    if(petId==''){
      if(!verify(inputs,selects,petId)){
        return
    }
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
    fetch('/api/addPet', {
      method: 'POST',
      body: info
    }).then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text);
        });
      }
      return response;
    }).then(message => {
      window.location.reload();
    }).catch(error => {
      console.error('Error:', error);
    });
 
    
}


function verify(inputs,selects){
    for(let i=0;i<inputs.length;i++){
        if(inputs[i].value.trim()=='' && inputs[i].id !== 'petid'){
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

function edit(e){
  button=e.relatedTarget;
  const name=button.getAttribute('data-name');
  const breed=button.getAttribute('data-breed');
  const weight=button.getAttribute('data-weight');
  const birth=button.getAttribute('data-birth');
  const sex=button.getAttribute('data-sex')
  const species=button.getAttribute('data-specie')
  const petid=button.getAttribute('data-petid')

  // Convert birth to a format that JavaScript can understand
  if(birth){  
      const birthDate = new Date(birth.replace(',', ''));

  // Format birthDate as "YYYY-MM-DD"
    const birthDateFormatted = birthDate.toISOString().split('T')[0];
    exampleModal.querySelector('#date').value=birthDateFormatted;

  }
  

  exampleModal.querySelector('#name').value=name;
  exampleModal.querySelector('#breed').value=breed;
  exampleModal.querySelector('#weight').value=weight;

  exampleModal.querySelector('#petid').value=petid;
 
 
  sexselect=exampleModal.querySelector('#sex')
  speciesselect=exampleModal.querySelector('#inputKind')

  Array.from(sexselect.options).forEach(option => {
    if (option.value === sex) {
      option.selected = true;
    }
  });
  Array.from(speciesselect.options).forEach(option => {
    if (option.value === species) {
      option.selected = true;
    }
  });
}

function deletePet(id){
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

        fetch('/api/deletePet',{
            method:'POST',
            body:JSON.stringify({id:id})
        })
        .then(response=>response.json)
        .then(message=>{
            Swal.fire(
                'Deleted!',
                'The Pet has been deleted.',
                'success'
              )
        })

        setTimeout(() => {
            window.location.reload();
          }, 1500);

     
    }
  })
}