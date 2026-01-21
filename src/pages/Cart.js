import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useContext(CartContext);

  if (cart.length === 0) {
    return (
      <section className="cart">
        <div className="cart-container">
          <h2 className="cart-title">Shopping Cart</h2>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <a href="/products" className="continue-shopping-btn">
              Continue Shopping
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart">
      <div className="cart-container">
        <h2 className="cart-title">Shopping Cart</h2>

        <div className="cart-content">
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="cart-item">
                    <td className="product-cell">
                      <div className="product-info">
                        <img src={item.image} alt={item.title} />
                        <div>
                          <h4>{item.title}</h4>
                          <p className="rating">Rating: {item.rating}/5</p>
                        </div>
                      </div>
                    </td>
                    <td className="price-cell">{item.price}</td>
                    <td className="quantity-cell">
                      <button
                        className="qty-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="qty-input"
                      />
                      <button
                        className="qty-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </td>
                    <td className="total-cell">
                      ${(
                        parseFloat(item.price.replace('$', '')) *
                        item.quantity
                      ).toFixed(2)}
                    </td>
                    <td className="action-cell">
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
            <a href="/products" className="continue-shopping">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
