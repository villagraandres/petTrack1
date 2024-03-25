document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#medicineSubmit').addEventListener('click', add)
    modalEdit=document.querySelector('#editModal')
    if(modalEdit){modalEdit.addEventListener('show.bs.modal', editModal)}
    document.querySelector('#medicineEdit').addEventListener('click', edit)
    document.querySelectorAll('.deleteBtns').forEach(btn=>{
        btn.addEventListener('click',()=>{
            deleteMed(btn.dataset.id)
        })
    })
}
);


function add() {
const form= document.querySelector('form');
const name = document.querySelector('#name').value;
const frequency= document.querySelector('#frequency').value;
document.querySelector('#medicineSubmit').disabled=true;

if( name === '' || frequency === '') {
    alert("Please fill out all fields");
    document.querySelector('#medicineSubmit').disabled=false;
    return ;
}

const data=new FormData(form);

fetch('/api/addMed', {  
    method: 'POST',
    body: data
}).then(message=>{
    Swal.fire(
        'The medicine was created succesfully',
        '',
        'success'
      )
    
    setTimeout(() => {
        window.location.reload();
      }, 1500);
})
}

function editModal(e){
    const button = e.relatedTarget; 
    const name = button.getAttribute('data-name');
    const frequency = button.getAttribute('data-frequency');
    const id = button.getAttribute('data-id');
    document.querySelector('#nameEdit').value = name;
    document.querySelector('#frequencyEdit').value = frequency; 
    document.querySelector('#medid').value = id; 
}

function edit(e){
    const form=document.querySelector('#medFormEdit');
    const name = document.querySelector('#nameEdit').value;
    const frequency= document.querySelector('#frequencyEdit').value;
    document.querySelector('#medicineEdit').disabled=true;

    if( name === '' || frequency === '') {
        alert("Please fill out all fields");
        document.querySelector('#medicineEdit').disabled=false;
        return ;
    }

    const data= new FormData(form);
    console.log(data);
    fetch('/api/editMed', {  
        method: 'POST',
        body: data
    }).then(message=>{
        Swal.fire(
            'The medicine was edited succesfully',
            '',
            'success'
          )
        
        setTimeout(() => {
            window.location.reload();
          }, 1500);
       
    })
}

function deleteMed(id){
    
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning', 
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            fetch('/api/deleteMed', {  
                method: 'POST',
                body: JSON.stringify({
                    id:id
                })
            }).then(message=>{
                Swal.fire(
                    'Deleted!',
                    'The med has been deleted.',
                    'success'
                  )
                
                setTimeout(() => {
                    window.location.reload();
                  }, 1500);
               
            })
        }
      })

}