
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#weightSubmit').addEventListener('click', add)
    getWeight();


});

function getWeight() {
    fetch('/api/getWeight?pet_id=57') // Reemplaza '1' con el ID de la mascota adecuada
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const dates = data.dates;
    const weights = data.weights;
    


    const ctx = document.getElementById('weightChart').getContext('2d');
    const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: dates,
    datasets: [{
      label: 'Peso de la Mascota',
      data: weights,
      borderColor: 'blue',
      borderWidth: 1,
      fill: false,
    }]
      },
      options: {
        // Opciones adicionales, como títulos, leyendas, escalas, etc.
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


