//fetch json items
async function loadItems() {
  return fetch('data/data.json')
    //arrow function에서 한 줄이면 굳이 {} 안써도 되긴 함
    .then(response => response.json())
    .then(response => response.items)
}

function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
  `;
}

//html에 선언되어 있는 태그를 js에서 쓸 수 있게 만들어주는게 바로 querySelector
function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
  if (key == null || value == null) {
    return;
  }
  console.log(key + "/" + value);
  console.log(items.filter(item => item[key] === value));
  displayItems(items.filter(item => item[key] === value));
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', event => onButtonClick(event, items))
}

loadItems()
  .then(items => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log("errors"));