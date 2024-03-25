let exampleModal;

document.addEventListener('DOMContentLoaded', () => {
    exampleModal = document.getElementById('addHistory');

    if (exampleModal) { 
        exampleModal.addEventListener('show.bs.modal', editModal);
    }

    const addSubmit = document.querySelector('#historySubmit');
    const editSubmit = document.querySelector('#historyEdit');
    const deleteSubmit = document.querySelector('#deleteSubmit');
    const dateBtn=document.querySelector('#filterDate');
    
   
    if (addSubmit) {
        addSubmit.addEventListener('click', add);
    }
    if(editSubmit){
        editSubmit.addEventListener('click',edit);
    }
    if(deleteSubmit){
        deleteSubmit.addEventListener('click',deleteHistory)
    }
    if(dateBtn){
       dateBtn.addEventListener('change',filterDate)
    }
    
});


function add(e){
    e.preventDefault();

    const form=document.querySelector('#historyForm');
    let subject=document.querySelector('#subject');
    let doctor=document.querySelector('#doctor');
    let date=document.querySelector('#date');
    let description=document.querySelector('#description');
    let prescription=document.querySelector('#prescription');
    const petid=document.querySelector('#petid');


   
    let errors = [];

    if (subject.value.trim() === '') {
        document.querySelector('#vaccSubmit').disabled=false;
        errors.push(subject);
    }
    if (doctor.value.trim() === '') {
        document.querySelector('#vaccSubmit').disabled=false;
        errors.push(doctor);
    }
    if (date.value === '') {
        document.querySelector('#vaccSubmit').disabled=false;
        errors.push(date);
    }
    if(description.value.trim()===''){
        document.querySelector('#vaccSubmit').disabled=false;
        errors.push(description)
    }
    if(prescription.value.trim()===''){
        document.querySelector('#vaccSubmit').disabled=false;
        errors.push(prescription)
    }

    if (errors.length > 0) {
        handleErrors(errors);
        return; // Detiene el flujo si hay errores
    }

   const info=new FormData(form);

   fetch('/api/addHistory',{
    method:'POST',
    body:info
   }).then(message=>{


    Swal.fire(
        'The appointment was created succesfully',
        '',
        'success'
      )
      setTimeout(() => {
        window.location.reload();
      }, 1500);

   })
}

function editModal(e){
    const button= e.relatedTarget;

    const subject=button.getAttribute('data-subject')
    const doctor=button.getAttribute('data-doctor')
    const date=button.getAttribute('data-date');
    const description=button.getAttribute('data-description');
    const prescription=button.getAttribute('data-prescription');
    if(date){
        var dateObj = new Date(date);
        var formatedExp = dateObj.toISOString().split('T')[0];
        exampleModal.querySelector('#date').value=formatedExp;
    }

    

   
    exampleModal.querySelector('#subject').value=subject;
    exampleModal.querySelector('#doctor').value=doctor;
    
    exampleModal.querySelector('#description').value=description;
    exampleModal.querySelector('#prescription').value=prescription;
}
function edit(e){
    e.preventDefault();

    const form=document.querySelector('#historyForm');
    let subject=document.querySelector('#subject');
    let doctor=document.querySelector('#doctor');
    let date=document.querySelector('#date');
    let description=document.querySelector('#description');
    let prescription=document.querySelector('#prescription');
   
    let errors = [];

    if (subject.value.trim() === '') {
        document.querySelector('#vaccSubmit').disabled=false;
        errors.push(subject);
    }
    if (doctor.value.trim() === '') {
        document.querySelector('#vaccSubmit').disabled=false;
        errors.push(doctor);
    }
    if (date.value === '') {
        document.querySelector('#vaccSubmit').disabled=false;
        errors.push(date);
    }
    if(description.value.trim()===''){
        document.querySelector('#vaccSubmit').disabled=false;
        errors.push(description)
    }
    if(prescription.value.trim()===''){
        document.querySelector('#vaccSubmit').disabled=false;
        errors.push(prescription)
    }

    if (errors.length > 0) {
        handleErrors(errors);
        return; // Detiene el flujo si hay errores
    }

   const info=new FormData(form);

   fetch('/api/editHistory',{
    method:'POST',
    body:info
   }).then(message=>{


    Swal.fire(
        'The appointment was edited succesfully',
        '',
        'success'
      )
      setTimeout(() => {
        window.location.reload();
      }, 1500);

   })
}


function deleteHistory(e){
    id=parseInt(e.srcElement.dataset.id)
    petid=parseInt(e.srcElement.dataset.pet)
    console.log(petid);
    

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

            fetch('/api/deleteHistory',{
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
                  window.location.href='/pet/history/'+petid;
                 
            })

          

         
        }
      }) 
}
function filterDate(e){
    console.log(e.srcElement.value);
    //send this information to the backend
    const petid=document.querySelector('#petid');
    const date=e.srcElement.value;
    fetch('/api/filterHistory',{
        method:'POST',
        body:JSON.stringify({petid:petid.value,date:date})
    })
    .then(response=>response.json())


}
function handleErrors(inputs) {
    inputs.forEach(input => {
        input.classList.add('border', 'border-danger');
        setTimeout(() => {
            input.classList.remove('border', 'border-danger');
        }, 2000);
    });
}

