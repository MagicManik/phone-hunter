// function of search phone
const searchPhone = () => {
  const searchField = document.getElementById('search-field');
  const searchFieldText = searchField.value;
  if (searchFieldText == '') {
    alert('Sorry! first of all type your favourite phone name then click me.')
  }
  else {
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`
    fetch(url)
      .then(res => res.json())
      .then(data => displaySearchResult(data.data))
  }

}

// create function for display search result
const displaySearchResult = phones => {
  // console.log(phones);

  // keep search result and details div
  const setSearchResult = document.getElementById('set-search-result');
  const setPhoneDetails = document.getElementById('set-phone-details');

  // clear search and detail result when set a new detail and search result
  setSearchResult.textContent = '';
  setPhoneDetails.textContent = '';

  // control search result will be not more than 20
  const phoneSliced = phones.slice(0, 20);

  // using for each loop on sliced phone and then
  phoneSliced.forEach(phone => {
    // create div and then set dynamically inner html
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="col">
        <div class="card h-100 border-0 shadow rounded-3">
          <img class="w-50 mx-auto mt-4" src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body mt-4">
          <h5 class="card-title ms-2">${phone.phone_name}</h5>
          <h6 class="card-text text-primary ms-2">${phone.brand}</h6>
         <div class="card border-0 mt-4 mb-3">
         <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary rounded-pill mx-auto px-4">Details</button>
         </div>
        </div>
    </div>
  `;
    // append dynamic inner html in search result div
    setSearchResult.appendChild(div);
  })
}


// create a function for create a dynamic phone detail url
const loadPhoneDetail = phoneId => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
  fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}


// create a function to set phone details
const displayPhoneDetails = phoneDetails => {

  // keep phone detail div
  const setPhoneDetail = document.getElementById('set-phone-details');
  // clear previous phone detail befor set a new phone detail
  setPhoneDetail.innerText = '';
  // creat div and then set dynamically phone details
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="card rounded-3">
      <img class="w-50 mx-auto mt-4" src="${phoneDetails.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h4 class="card-title text-center fw-bold">${phoneDetails.name}</h4>
        <h6 id="release-date" class="card-text text-center">${phoneDetails.releaseDate}</h6>
        <h6 id="release-date" class="card-text text-center">Brand:
        <span class="text-primary">${phoneDetails.brand}</span></h6>
        <p class="fw-bold mt-4"><u>Main Features</u></p>
        <ul id="setMainFeatures"></ul>
        <p class="fw-bold mt-4"><u>Other Features</u></p>
        <ul id="setOtherFeatures"></ul>
      </div>
    </div>
  `;
  // append phone details
  setPhoneDetail.appendChild(div);

  // keep release date id
  const releaseDate = document.getElementById('release-date');
  // control release date
  if (releaseDate.innerText === '') {
    releaseDate.innerHTML = `<span class="text-danger">Release date is not found</span>`
  }

  // keep main features id
  const setMainFeatures = document.getElementById('setMainFeatures');
  // using for in loop on mainfeatures
  for (const mainFeature in phoneDetails.mainFeatures) {
    // create li for set main feature on phone details
    const li = document.createElement('li');
    li.innerHTML = `<h6 class="fw-bold">${mainFeature}</h6>
                        ${phoneDetails.mainFeatures[mainFeature]}
                   `
    // append li in main features
    setMainFeatures.appendChild(li);
  }

  // keep ul for append other features
  const setOtherFeatures = document.getElementById('setOtherFeatures');
  for (const otherFeature in phoneDetails.others) {
    // create li for set other feature on phone details
    const li2 = document.createElement('li');
    li2.innerHTML = `<h6>${otherFeature}</h6>
    ${phoneDetails.others[otherFeature]}
    `
    // append other features on phone details
    setOtherFeatures.appendChild(li2);
  }
}