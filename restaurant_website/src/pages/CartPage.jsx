import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import '../css/CartPage.css';

const CartPage = ({ cart, updateCart, removeFromCart, updateItemQuantity }) => {
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoInput, setPromoInput] = useState('');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    specialInstructions: ''
  });

  // Safely get user from auth context
  const authContext = useAuth();
  const user = authContext?.user || null;

  const PROMO_CODES = {
    'WELCOME10': { discount: 0.1, description: '10% off your order' },
    'SAVE15': { discount: 0.15, description: '15% off your order' },
    'FREESHIP': { discount: 'free', description: 'Free delivery' },
    'FIRST25': { discount: 0.25, description: '25% off your first order' }
  };
  
  const DELIVERY_FEE = 2.99;
  const TAX_RATE = 0.1;

  // Pre-fill form with user data if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      }));
    }
  }, [user]);

  // Calculate cart totals
  const calculateTotals = () => {
    const subtotal = cart.reduce((total, item) => {
      const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
      return total + (price * item.quantity);
    }, 0);

    const tax = subtotal * TAX_RATE;
    let discount = 0;
    let deliveryFee = DELIVERY_FEE;

    if (appliedPromo) {
      if (typeof PROMO_CODES[appliedPromo].discount === 'number') {
        discount = subtotal * PROMO_CODES[appliedPromo].discount;
      } else if (PROMO_CODES[appliedPromo].discount === 'free') {
        deliveryFee = 0;
      }
    }

    const total = subtotal + tax + deliveryFee - discount;

    return { subtotal, tax, deliveryFee, discount, total };
  };

  const { subtotal, tax, deliveryFee, discount, total } = calculateTotals();

  const updateQuantity = (itemId, change) => {
    const item = cart.find(item => item.id === itemId);
    if (!item) return;

    const newQuantity = item.quantity + change;
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }

    updateItemQuantity(itemId, newQuantity);
  };

  const removeItem = (itemId) => {
    removeFromCart(itemId);
  };

  const applyPromoCode = () => {
    const code = promoInput.trim().toUpperCase();
    
    if (!code) {
      setPromoError('Please enter a promo code');
      return;
    }
    
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoSuccess(`Promo code applied: ${PROMO_CODES[code].description}`);
      setPromoError('');
      setPromoInput('');
      
      // Clear success message after 3 seconds
      setTimeout(() => setPromoSuccess(''), 3000);
    } else {
      setPromoError('Invalid promo code');
      setPromoSuccess('');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError('');
    setPromoSuccess('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to proceed with checkout');
      return;
    }
    setIsCheckoutModalOpen(true);
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Generate order details
    const order = {
      orderId: `ORD-${Date.now()}`,
      orderDate: new Date().toLocaleString(),
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      paymentMethod: formData.paymentMethod,
      subtotal: calculateTotals().subtotal,
      tax: calculateTotals().tax,
      deliveryFee: calculateTotals().deliveryFee,
      discount: calculateTotals().discount,
      total: calculateTotals().total,
      items: cart.map(item => ({
        name: item.name,
        price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
        quantity: item.quantity,
        image: item.image,
        description: item.description
      }))
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(order)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save order');
      }

      const result = await response.json();
      
      // Update order details with the response from server
      setOrderDetails({
        id: result.orderId,
        orderDate: order.orderDate,
        customer: {
          name: order.customerName,
          email: order.customerEmail,
          phone: order.customerPhone,
          address: order.customerAddress,
          paymentMethod: order.paymentMethod
        },
        items: order.items,
        totals: {
          subtotal: order.subtotal,
          tax: order.tax,
          deliveryFee: order.deliveryFee,
          discount: order.discount,
          total: order.total
        }
      });
      
      setIsCheckoutModalOpen(false);
      setIsBillModalOpen(true);
      
      // Clear cart
      updateCart([]);
      localStorage.removeItem('cart');
    } catch (error) {
      alert(error.message || 'Failed to place order. Please try again.');
      console.error('Order submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const printBill = () => {
    window.print();
  };

  return (
    <>
      {/* Cart Content */}
      <div className="cart-section">
        <div className="container">
          <h1 className="section-title">Your <span>Cart</span></h1>
          
          {cart.length === 0 ? (
            <div className="empty-cart">
              <i className="fas fa-shopping-cart"></i>
              <h3>Your cart is empty</h3>
              <p>Add some delicious food to get started!</p>
              <a href="/menu" className="btn-primary">Browse Menu</a>
            </div>
          ) : (
            <div className="cart-container">
              <div className="cart-items">
                <div className="cart-header">
                  <h2>Your Order ({cart.length} {cart.length === 1 ? 'item' : 'items'})</h2>
                </div>
                
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-price">${typeof item.price === 'string' ? parseFloat(item.price) : item.price}</p>
                      <div className="cart-item-actions">
                        <div className="quantity-control">
                          <button 
                            className="quantity-btn" 
                            onClick={() => updateQuantity(item.id, -1)}
                          >-</button>
                          <input 
                            type="number" 
                            className="quantity-input" 
                            value={item.quantity} 
                            readOnly
                          />
                          <button 
                            className="quantity-btn" 
                            onClick={() => updateQuantity(item.id, 1)}
                          >+</button>
                        </div>
                        <button 
                          className="remove-btn"
                          onClick={() => removeItem(item.id)}
                        >
                          <i className="fas fa-trash"></i> Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-total">
                      ${((typeof item.price === 'string' ? parseFloat(item.price) : item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-card">
                  <h2>Order Summary</h2>
                  
                  <div className="summary-details">
                    <div className="summary-row">
                      <span>Subtotal ({cart.length} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="summary-row">
                      <span>Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="summary-row">
                      <span>Delivery Fee</span>
                      <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="summary-row discount">
                        <span>Discount ({appliedPromo})</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="promo-code">
                      <input 
                        type="text" 
                        placeholder="Enter promo code" 
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        disabled={appliedPromo !== null}
                      />
                      {appliedPromo ? (
                        <button onClick={removePromoCode} className="btn-remove-promo">
                          Remove
                        </button>
                      ) : (
                        <button onClick={applyPromoCode}>
                          Apply
                        </button>
                      )}
                    </div>
                    
                    {promoError && <div className="promo-error">{promoError}</div>}
                    {promoSuccess && <div className="promo-success">{promoSuccess}</div>}

                    <div className="summary-row total">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button 
                    className="checkout-btn" 
                    onClick={handleCheckout}
                    disabled={cart.length === 0 || loading}
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i> Processing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-lock"></i> Proceed to Checkout
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="modal" id="checkoutModal">
          <div className="modal-content">
            <span className="close-modal" onClick={() => setIsCheckoutModalOpen(false)}>&times;</span>
            <h2>Checkout</h2>
            <form id="checkout-form" onSubmit={submitOrder}>
              <div className="form-group">
                <h3>Customer Information</h3>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone Number" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="form-group">
                <h3>Delivery Address</h3>
                <textarea 
                  name="address"
                  placeholder="Full delivery address" 
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <h3>Payment Method</h3>
                <select 
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select payment method</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="cash">Cash on Delivery</option>
                </select>

                {formData.paymentMethod && (formData.paymentMethod === 'credit_card' || formData.paymentMethod === 'debit_card') && (
                  <div id="card-details">
                    <input 
                      type="text" 
                      name="cardNumber"
                      placeholder="Card Number" 
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                    />
                    <div className="card-row">
                      <input 
                        type="text" 
                        name="cardExpiry"
                        placeholder="MM/YY" 
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                      />
                      <input 
                        type="text" 
                        name="cardCvv"
                        placeholder="CVV" 
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group">
                <h3>Special Instructions</h3>
                <textarea 
                  name="specialInstructions"
                  placeholder="Any special delivery instructions" 
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="order-summary">
                <h3>Order Summary</h3>
                {cart.map((item) => (
                  <div key={item.id} className="summary-item">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${((typeof item.price === 'string' ? parseFloat(item.price) : item.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="summary-total">
                  <strong>Total: ${total.toFixed(2)}</strong>
                </div>
              </div>

              <button type="submit" className="checkout-btn" disabled={loading}>
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Placing Order...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check"></i> Place Order
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Order Bill Modal */}
      {isBillModalOpen && orderDetails && (
        <div className="modal bill-modal" id="billModal">
          <div className="modal-content bill-content">
            <div className="bill-header">
              <h2>Order Confirmed!</h2>
              <p>Thank you for your order</p>
            </div>

            <div className="bill-details">
              <div className="bill-customer">
                <h3>Order Information</h3>
                <p><strong>Order ID:</strong> #{orderDetails.id}</p>
                <p><strong>Order Date:</strong> {orderDetails.orderDate}</p>
                <p><strong>Customer Name:</strong> {orderDetails.customer.name}</p>
                <p><strong>Delivery Address:</strong> {orderDetails.customer.address}</p>
                <p><strong>Phone:</strong> {orderDetails.customer.phone}</p>
              </div>

              <div className="bill-items">
                <h3>Order Items</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${(typeof item.price === 'string' ? parseFloat(item.price) : item.price).toFixed(2)}</td>
                        <td>${((typeof item.price === 'string' ? parseFloat(item.price) : item.price) * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bill-summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${orderDetails.totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%):</span>
                  <span>${orderDetails.totals.tax.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee:</span>
                  <span>${orderDetails.totals.deliveryFee.toFixed(2)}</span>
                </div>
                {orderDetails.totals.discount > 0 && (
                  <div className="summary-row discount">
                    <span>Discount ({appliedPromo}):</span>
                    <span>-${orderDetails.totals.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${orderDetails.totals.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="payment-method">
                <p><strong>Payment Method:</strong> {orderDetails.customer.paymentMethod}</p>
              </div>
            </div>

            <div className="bill-footer">
              <p>Your food will be delivered within 30-45 minutes</p>
              <p>For any queries, call: +1 (555) 123-4567</p>
              <div className="bill-actions">
                <button onClick={printBill} className="btn-primary" id="print-bill">
                  <i className="fas fa-print"></i> Print Receipt
                </button>
                <button onClick={() => setIsBillModalOpen(false)} className="btn-secondary" id="close-bill">
                  <i className="fas fa-times"></i> Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;