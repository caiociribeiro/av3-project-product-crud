const productsDOM = document.querySelector('.products');
const formDOM = document.querySelector('.product-form');
const loadingDOM = document.querySelector('.loading');
const nameInputDOM = document.querySelector('#name');
const descriptionInputDOM = document.querySelector('#description');
const priceInputDOM = document.querySelector('#price');
const nameLabel = document.querySelector('#name-label');
const descriptionLabel = document.querySelector('#description-label');
const priceLabel = document.querySelector('#price-label');
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
  if (price === 0) {
    priceLabel.innerHTML += ' <strong>*Preço precisa ser fornecido</strong>';
    return false;
  }
  return true;
};

const showProducts = async () => {
  try {
    loadingDOM.style.visibility = 'visible';

    const { data: products } = await axios.get(`${url}/api/v1/products`);

    if (products.length < 1) {
      productsDOM.innerHTML =
        '<h5 class="no-products">No products in your list</h5>';
      loadingDOM.style.visibility = 'hidden';
      return;
    }

    const allProducts = products
      .map((product) => {
        const { id, name, price } = product;
        return `<div class="single-product"><h5 class="name">${name}</h5><h5 class="rs">R$</h5><h5 class="price">${Number(
          price
        ).toFixed(2)}</h5>
      <div class="product-links">

      <a href="product.html?id=${id}" class="edit-link">
      <i class="fas fa-edit"></i>
      </a>
      <button type="button" class="delete-btn" data-id="${id}">
      <i class="fas fa-trash"></i>
      </button>
      </div>
      </div>`;
      })
      .join('');
    console.log(products);
    productsDOM.innerHTML = allProducts;
  } catch (error) {
    console.log(error);
    productsDOM.innerHTML =
      '<h5 class="text-danger">Houve um erro. Tente novamente mais tarde....</h5>';
  }
  loadingDOM.style.visibility = 'hidden';
};

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log(name, description, price);
  try {
    const name = nameInputDOM.value;
    const description = descriptionInputDOM.value;
    const price = Number(priceInputDOM.value);

    const validName = checkValidNameInput(name);
    const validDescription = checkValidDescriptionInput(description);
    const validPrice = checkValidPrice(price);

    if (!validName || !validDescription || !validPrice) {
      throw new Error('Invalid form input');
    }

    await axios.post(`${url}/api/v1/products`, {
      name,
      description,
      price,
    });

    showProducts();

    nameInputDOM.value = '';
    descriptionInputDOM.value = '';
    priceInputDOM.value = '';
  } catch (error) {
    console.log(error);
  }
});

productsDOM.addEventListener('click', async (e) => {
  const el = e.target;
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible';
    const id = el.parentElement.dataset.id;

    try {
      await axios.delete(`${url}/api/v1/products/${id}`);
      showProducts();
    } catch (error) {
      console.log(error);
    }
  }
});

showProducts();
