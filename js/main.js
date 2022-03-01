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
            <button onclick="loadPhoneDetail('${phone.slug}')">Details</button>
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


const displayPhoneDetails = phoneDetail => {
  const setPhoneDetail = document.getElementById('set-phone-details')
  const div = document.createElement('div');
  div.innerHTML = `
      <div class="card">
      <img src="${phoneDetail.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
  `;
  setPhoneDetail.appendChild(div);
}