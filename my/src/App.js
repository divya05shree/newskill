import React, { useState, useEffect } from 'react';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productImages, setProductImages] = useState({});

  useEffect(() => {
    async function fetchImages() {
      const promises = [];
      for (let i = 1; i <= 3; i++) {
        promises.push(
          fetch('https://source.unsplash.com/random/?product').then((response) => {
            setProductImages((prevImages) => ({
              ...prevImages,
              [`Product ${i}`]: response.url,
            }));
          })
        );
      }
      await Promise.all(promises);
    }
    fetchImages();
  }, []);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
              <img src={productImages[item.name]} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
              <span>{item.name} - ${item.price}</span>
              <button onClick={() => removeFromCart(index)} style={{ marginLeft: 'auto', backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3 style={{ color: '#333', marginTop: '20px' }}>Products</h3>
      <ul>
        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <img src={productImages['Product 1']} alt="Product 1" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
          <span>Product 1 - $10</span>
          <button onClick={() => addToCart({ name: 'Product 1', price: 10 })} style={{ marginLeft: 'auto', backgroundColor: '#4caf50', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Add to Cart</button>
        </li>
        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <img src={productImages['Product 2']} alt="Product 2" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
          <span>Product 2 - $20</span>
          <button onClick={() => addToCart({ name: 'Product 2', price: 20 })} style={{ marginLeft: 'auto', backgroundColor: '#4caf50', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Add to Cart</button>
        </li>
        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <img src={productImages['Product 3']} alt="Product 3" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
          <span>Product 3 - $30</span>
          <button onClick={() => addToCart({ name: 'Product 3', price: 30 })} style={{ marginLeft: 'auto', backgroundColor: '#4caf50', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Add to Cart</button>
        </li>
      </ul>
    </div>
  );
};

export default ShoppingCart;

