


document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#weightSubmit').addEventListener('click', add)
    document.querySelectorAll('.td-click').forEach(td=>{
      td.addEventListener('click',()=>{
        deleteWeight(td.dataset.id)
      })
    })
    getWeight();


});

function getWeight() {
  idPet=document.querySelector('#petid').value
    fetch('/api/getWeight?pet_id='+idPet) 
  .then(response => response.json())
  .then(data => {
    const dates = data.dates;
    const weights = data.weights;
    


    const ctx = document.getElementById('weightChart').getContext('2d');
    const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: dates,
    datasets: [{
      label: 'Pet Weight',
      data: weights,
      borderColor: 'blue',
      borderWidth: 1,
      fill: false,
    }]
      },
      options: {
         
      }
    });
  })
  .catch(error => console.error('Error fetching weight data:', error));


}

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

function deleteWeight(id){
   
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
        fetch('/api/deleteWeight', {  
            method: 'POST',
            body: JSON.stringify({
                id:id
            })
        }).then(message=>{
            Swal.fire(
                'Deleted!',
                'The record has been deleted.',
                'success'
              )
            
            setTimeout(() => {
                window.location.reload();
              }, 1500);
           
        })
    }
  })


}