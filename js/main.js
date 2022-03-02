const searchPhone = () => {
  const searchField = document.getElementById('search-field');
  const searchFieldText = searchField.value;
  if (searchFieldText == '') {

  }
  else {
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`
    fetch(url)
      .then(res => res.json())
      .then(data => displaySearchResult(data.data))
  }

}



const displaySearchResult = phones => {
  const setSearchResult = document.getElementById('set-search-result');
  const setPhoneDetail = document.getElementById('set-phone-details');
  setSearchResult.textContent = '';
  setPhoneDetail.textContent = '';
  for (const phone of phones) {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="col">
          <div class="card h-100 border-0 shadow rounded-3">
            <img class="w-50 mx-auto mt-4" src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <h6 class="card-text text-primary">${phone.brand}</h6>
           <div class="card border-0">
           <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary rounded-pill w-50 mx-auto px-5">Details</button>
           </div>
          </div>
      </div>
    `;
    setSearchResult.appendChild(div);
  }
}



const loadPhoneDetail = phoneId => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
  fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}



const displayPhoneDetails = phoneDetails => {
  console.log(phoneDetails);
  const setPhoneDetail = document.getElementById('set-phone-details')
  setPhoneDetail.innerText = '';
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="card rounded-3">
      <img class="w-50 mx-auto mt-4" src="${phoneDetails.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h4 class="card-title text-center fw-bold">${phoneDetails.name}</h4>
        <h6 id="release-date" class="card-text text-center">${phoneDetails.releaseDate}</h6>
        <h6 id="release-date" class="card-text text-center">Brand:
        <span class="text-primary">${phoneDetails.brand}</span></h6>
        <p class="fw-bold mt-4"><u>Main Features:</u></p>
        <ul id="setMainFeatures"></ul>
      </div>
    </div>
  `;
  setPhoneDetail.appendChild(div);

  const setMainFeatures = document.getElementById('setMainFeatures');
  for (const mainFeature in phoneDetails.mainFeatures) {
    // console.log(mainFeature);
    const li = document.createElement('li');
    li.innerHTML = `<h6 class="fw-bold">${mainFeature}:</h6>
                        ${phoneDetails.mainFeatures[mainFeature]}
                   `
    setMainFeatures.appendChild(li);
  }
  const releaseDate = document.getElementById('release-date');
  if (releaseDate.innerText === '') {
    releaseDate.innerHTML = `<span class="text-danger">No released date found</span>`
  }
}