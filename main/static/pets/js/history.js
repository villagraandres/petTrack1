document.addEventListener('DOMContentLoaded',()=>{
    addSubmit=document.querySelector('#historySubmit')
    editSubmit=document.querySelector('#editSubmit')
    const exampleModal = document.getElementById('addHistory');

    if(exampleModal){ exampleModal.addEventListener('show.bs.modal',edit)}

    
    if (addSubmit){
        addSubmit.addEventListener('click',add)
    }


    
})

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

function edit(e){
    const button= e.relatedTarget;

    const subject=button.getAttribute('data-subject')
    const doctor=button.getAttribute('data-doctor')
    const date=button.getAttribute('data-date');
    const description=button.getAttribute('data-description');
    const prescription=button.getAttribute('data-prescription');
    
    console.log(prescription);
    
}

function handleErrors(inputs) {
    inputs.forEach(input => {
        input.classList.add('border', 'border-danger');
        setTimeout(() => {
            input.classList.remove('border', 'border-danger');
        }, 2000);
    });
}