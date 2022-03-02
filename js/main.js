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
  setSearchResult.textContent = '';
  for (const phone of phones) {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="col">
          <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.brand}</p>
            <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary">Details</button>
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
    <div class="card">
      <img src="${phoneDetails.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h4 class="card-title text-center fw-bold">${phoneDetails.name}</h4>
        <p id="release-date" class="card-text text-center fw-bold">${phoneDetails.releaseDate}</p>
        <ul id="setMainFeatures"></ul>
      </div>
    </div>
  `;
  setPhoneDetail.appendChild(div);

  const setMainFeatures = document.getElementById('setMainFeatures');
  for (const mainFeature in phoneDetails.mainFeatures) {
    // console.log(mainFeature);
    const li = document.createElement('li');
    li.innerHTML = `<span class="fw-bold">${mainFeature}:</span> ${phoneDetails.mainFeatures[mainFeature]}`
    setMainFeatures.appendChild(li);
  }
  const releaseDate = document.getElementById('release-date');
  if (releaseDate.innerText === '') {
    releaseDate.innerText = 'No released date found'
  }
}