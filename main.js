// fetch
function loadItems() {
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
    return `
      <li class="item" data-type=${item.type} data-color=${item.color}>
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail" data>
        <span class="item__description">${item.gender}, ${item.size}</span>
      </li>
    `;
}

function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;    

    if(key === null || value === null){
        return;
    }
    
     updateItems(items, key, value);
}

function updateItems(items, key, value) {
    const allItems = document.querySelectorAll('.item');
    allItems.forEach(item => {
        if(item.dataset[key] === value){
            item.classList.remove('invisible');
        }else{
            item.classList.add('invisible');
        } 
    });
}


function setEventListner(items){
    const logo = document.querySelector('.logo');
    const button = document.querySelector('.button__list');
    logo.addEventListener('click', () => displayItems(items));
    button.addEventListener('click', event => onButtonClick(event, items));

}

// main
loadItems()
    .then(items =>{
        displayItems(items);
        setEventListner(items);
    }).catch(console.log);