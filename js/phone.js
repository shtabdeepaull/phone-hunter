
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear data
    searchField.value = '';
    
        //   result not found message
        if(searchText == '' ){
            document.getElementById('result-message').style.display='block';
       }

   else{
        const url= `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(phone => displySearchResult(phone.data))
       
        }        
       

        // display result area

const displySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if(data.length == 0){
        document.getElementById('result-message').style.display='block';
    }
    data.slice(0,20).forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
                 <p class="card-text fw-bold">Brand:${phone.brand}</p>
                 <button onclick="showDetails('${phone.slug}')" class="btn btn-outline-secondary w-75 ms-5 rounded-pill" type="button" id="details-btn">Details</button>
            </div>
      </div>
        `;
        searchResult.appendChild(div);

    })
    

    }
}

const showDetails = phoneDetail => {
    const url =`https://openapi.programming-hero.com/api/phone/${phoneDetail}`;
    fetch(url)
    .then(res => res.json())
    .then(phoneData => displayPhoneDetails(phoneData.data));
  
}

const displayPhoneDetails = detail => {
    const phoneDetails =document.getElementById('phone-details');
    phoneDetails.textContent='';
    const div = document.createElement('div');
    document.getElementById('phone-details'). style.width=50%
    div.classList.add('card');
    div.innerHTML = `
    
            <div class="card-body text-center">
              <h5 class="card-title fw-bold">Name:${detail.name}</h5>
              <p class="card-text fw-blod">Slug:${detail.slug}</p>
              <p class="card-text fw-blod">ReleaseDate:${detail.releaseDate}</p>
              <p class="card-text fw-blod"> Sensors:${detail.mainFeatures.sensors}</p>
              <p class="card-text fw-blod"> Storage:${detail.mainFeatures.storage}</p>
              <p class="card-text fw-blod"> Display-Size:${detail.mainFeatures.displaySize}</p>
              <p class="card-text fw-blod"> Memory:${detail.mainFeatures.memory}</p>
              <p class="card-text fw-blod"> Others:${detail.others.Bluetooth}</p>
             
            </div>
    
    `;
    phoneDetails.appendChild(div);

    
}
