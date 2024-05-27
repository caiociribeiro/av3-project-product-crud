const supabase = require('../db/supabase');

const getProducts = async (req, res) => {
  const { data, error } = await supabase.from('products').select();
  res.send(data);
  console.log(`lists all products${data}`);
};

const getSingleProduct = async (req, res) => {
  console.log('id = ' + req.params.id);
  const { data, error } = await supabase
    .from('products')
    .select()
    .eq('id', req.params.id);
  res.send(data);

  console.log('retorno ' + data);
};

const setProduct = async (req, res) => {
  const { error } = await supabase.from('products').insert({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  if (error) {
    res.send(error);
  }
  res.send('created!!');
  console.log('retorno ' + req.body.name);
  console.log('retorno ' + req.body.description);
  console.log('retorno ' + req.body.price);
};

const updateProduct = async (req, res) => {
  const { error } = await supabase
    .from('products')
    .update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    })
    .eq('id', req.params.id);
  if (error) {
    res.send(error);
  }
  res.send('updated!!');
};

const deleteProduct = async (req, res) => {
  console.log('delete: ' + req.params.id);
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', req.params.id);
  if (error) {
    res.send(error);
  }
  res.send('deleted!!');
  console.log('delete: ' + req.params.id);
};

module.exports = {
  getProducts,
  getSingleProduct,
  setProduct,
  updateProduct,
  deleteProduct,
};
