document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('#historySubmit').addEventListener('click',add);
})

function add(e){
    e.preventDefault();

    const form=document.querySelector('#historyForm');
    let subject=document.querySelector('#subject');
    let date=document.querySelector('#history_date');
    let description=document.querySelector('#description');
    let prescription=document.querySelector('#prescription');

   
    let errors = [];

    if (subject.value.trim() === '') {
        errors.push(subject);
    }
    if (date.value.trim() === '') {
        errors.push(date);
    }
    if(description.value.trim()===''){
        errors.push(description)
    }
    if(prescription.value.trim()===''){
        errors.push(prescription)
    }

    if (errors.length > 0) {
        handleErrors(errors);
        return; // Detiene el flujo si hay errores
    }

   const info=new FormData(form);

   
}

function handleErrors(inputs) {
    inputs.forEach(input => {
        input.classList.add('border', 'border-danger');
        setTimeout(() => {
            input.classList.remove('border', 'border-danger');
        }, 2000);
    });
}