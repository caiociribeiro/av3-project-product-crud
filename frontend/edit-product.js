const editFormDOM = document.querySelector('.single-product-form');
const formAlertDOM = document.querySelector('.form-alert');
const loadingDOM = document.querySelector('.loading');
const nameInputDOM = document.querySelector('#product-edit-name');
const descriptionInputDOM = document.querySelector('#product-edit-description');
const priceInputDOM = document.querySelector('#product-edit-price');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');
const nameLabel = document.querySelector('#name-label');
const descriptionLabel = document.querySelector('#description-label');
const priceLabel = document.querySelector('#price-label');
let tempName;
let tempDescription;
let tempPrice;
const url = 'http://127.0.0.1:5000';

const checkValidNameInput = (name) => {
  nameLabel.innerHTML = 'Nome';
  if (name.length < 1) {
    nameLabel.innerHTML += ' <strong>*Nome precisa ser fornecido</strong>';
    return false;
  }
  return true;
};

const checkValidDescriptionInput = (description) => {
  descriptionLabel.innerHTML = 'Descrição';
  if (description.length < 1) {
    descriptionLabel.innerHTML +=
      ' <strong>*Descrição precisa ser fornecida</strong>';
    return false;
  }
  return true;
};

const checkValidPrice = (price) => {
  priceLabel.innerHTML = 'Preço';
  if (price == 0) {
    priceLabel.innerHTML += ' <strong>*Preço precisa ser fornecido</strong>';
    return false;
  }
  return true;
};

const showProduct = async () => {
  try {
    const { data: product } = await axios.get(`${url}/api/v1/products/${id}`);
    console.log(product);
    const { name, description, price } = product[0];

    nameInputDOM.value = name;
    descriptionInputDOM.value = description;
    priceInputDOM.value = price;
  } catch (error) {
    console.log(error);
  }
};

showProduct();

editFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const name = nameInputDOM.value;
    const description = descriptionInputDOM.value;
    const price = priceInputDOM.value;

    const validName = checkValidNameInput(name);
    const validDescription = checkValidDescriptionInput(description);
    const validPrice = checkValidPrice(price);

    if (!validName || !validDescription || !validPrice) {
      throw new Error('Invalid form input');
    }

    await axios.patch(`${url}/api/v1/products/${id}`, {
      name: name,
      description: description,
      price: price,
    });

    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = `Sucesso! Produto editado`;
    formAlertDOM.classList.add('text-success');

    setTimeout(() => {
      formAlertDOM.style.display = 'none';
      formAlertDOM.classList.remove('text-success');
    }, 3000);
  } catch (error) {
    console.log(error);
    formAlertDOM.style.display = 'block';
    formAlertDOM.innerHTML = `erro, por favor tente novamente`;
  }
});
