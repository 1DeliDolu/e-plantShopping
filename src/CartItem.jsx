import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const price = parseFloat(item.cost.substring(1)) || 0;
      total += price * (item.quantity || 0);
    });
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) onContinueShopping(e);
  };



  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1)) || 0;
    const qty = item.quantity || 0;
    return (price * qty).toFixed(2);
  };

  const handleCheckoutShopping = (e) => {
    setShowCheckout(true);
  };

  const handleProceedToPayment = () => {
    // basic validation
    if (!customerName || !customerEmail) {
      alert('Please enter name and email to continue.');
      return;
    }
    setShowPayment(true);
  };

  const handleMockPay = () => {
    // very simple card validation
    const cleaned = (cardNumber || '').replace(/\s+/g, '');
    if (cleaned.length < 12) {
      alert('Enter a valid mock card number (12+ digits)');
      return;
    }
    // mock successful payment
    const id = 'ORD-' + Date.now();
    setOrderId(id);
    setOrderPlaced(true);
    // clear cart
    dispatch(clearCart());
    // hide checkout/payment UI
    setShowPayment(false);
    setShowCheckout(false);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {orderPlaced && (
        <div style={{ padding: '12px', background: '#e6ffed', border: '1px solid #a5f3b1', marginBottom: '12px' }}>
          <strong>Order placed:</strong> {orderId}. A confirmation has been sent to {customerEmail}.
        </div>
      )}
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>

      {/* Checkout UI: step 1 = order form, step 2 = mock payment */}
      {showCheckout && !orderPlaced && (
        <div className="checkout-overlay">
          <div className="checkout-modal">
            <h3>Checkout — Order Details</h3>
            <div style={{ marginBottom: '8px' }}>
              <label>Name</label>
              <input value={customerName} onChange={e => setCustomerName(e.target.value)} />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label>Email</label>
              <input value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <div><strong>Order total:</strong> ${calculateTotalAmount()}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={handleProceedToPayment}>Proceed to Payment</button>
              <button onClick={() => setShowCheckout(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showPayment && !orderPlaced && (
        <div className="checkout-overlay">
          <div className="checkout-modal">
            <h3>Mock Payment</h3>
            <div style={{ marginBottom: '8px' }}>
              <label>Card Number</label>
              <input value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="4111 1111 1111" />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={handleMockPay}>Pay ${calculateTotalAmount()}</button>
              <button onClick={() => setShowPayment(false)}>Back</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;


