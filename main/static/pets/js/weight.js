document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#weightSubmit').addEventListener('click', add)
});

function add(e) {
    e.preventDefault();
    form=document.querySelector('#weightForm');
    weight=form.elements['weight'].value;
    date=form.elements['date'].value;
    document.querySelector('#weightSubmit').disabled=true;

    if(weight.trim()=="" || date==""){
        alert("Please fill out all fields");
        document.querySelector('#weightSubmit').disabled=false;
        return;
    }

    const info=new FormData(form);
    fetch('/api/addWeight', {
        method: 'POST',
        body:info
    }).then(message=>{
        Swal.fire(
            'Success!',
            'Weight added',
            'success'
        )
        setTimeout(() => {
            window.location.reload();
          }, 1500);
    }
    )
}


