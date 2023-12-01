document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('#historySubmit').addEventListener('click',add);
})

function add(e){
    e.preventDefault();

    const form=document.querySelector('#historyForm');
    let subject=document.querySelector('#subject');
    let date=document.querySelector('#date');
    let description=document.querySelector('#description');
    let prescription=document.querySelector('#prescription');
    const petid=document.querySelector('#petid');
    document.querySelector('#vaccSubmit').disabled=true;

   
    let errors = [];

    if (subject.value.trim() === '') {
        document.querySelector('#vaccSubmit').disabled=false;
        errors.push(subject);
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

function handleErrors(inputs) {
    inputs.forEach(input => {
        input.classList.add('border', 'border-danger');
        setTimeout(() => {
            input.classList.remove('border', 'border-danger');
        }, 2000);
    });
}