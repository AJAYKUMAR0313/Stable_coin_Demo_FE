import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { useState } from "react";

const PAYMENT_METHODS = [
  { id: "upi", name: "UPI", icon: "📱", description: "Pay using any UPI app" },
  { id: "card", name: "Credit/Debit Card", icon: "💳", description: "Visa, Mastercard, Rupay" },
  { id: "netbanking", name: "Net Banking", icon: "🏦", description: "All major banks supported" },
  { id: "wallet", name: "Wallet", icon: "👛", description: "Paytm, PhonePe, Google Pay" },
];

export default function PaymentModal({ open, amount, onConfirm, onClose }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const handlePayment = () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      
      // Call onConfirm after showing success
      setTimeout(() => {
        setSuccess(false);
        setSelectedMethod(null);
        setPaymentDetails({
          upiId: "",
          cardNumber: "",
          cardExpiry: "",
          cardCvv: "",
        });
        onConfirm();
      }, 1500);
    }, 2000);
  };

  const handleClose = () => {
    if (!processing && !success) {
      setSelectedMethod(null);
      setPaymentDetails({
        upiId: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvv: "",
      });
      onClose();
    }
  };

  if (success) {
    return (
      <Modal open={open}>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ 
            fontSize: "64px", 
            marginBottom: "16px",
            animation: "scaleIn 0.5s ease-out"
          }}>
            ✓
          </div>
          <Text.Title style={{ color: "#22c55e" }}>
            Payment Successful!
          </Text.Title>
          <Text.Muted style={{ marginTop: "8px" }}>
            Processing your transaction...
          </Text.Muted>
        </div>
      </Modal>
    );
  }

  if (processing) {
    return (
      <Modal open={open}>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ 
            width: "48px", 
            height: "48px", 
            border: "4px solid #f0f0f0",
            borderTop: "4px solid #000",
            borderRadius: "50%",
            margin: "0 auto 24px",
            animation: "spin 1s linear infinite"
          }} />
          <Text.Title>Processing Payment</Text.Title>
          <Text.Muted style={{ marginTop: "8px" }}>
            Please wait...
          </Text.Muted>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "24px"
        }}>
          <Text.Title>Select Payment Method</Text.Title>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#666"
            }}
          >
            ×
          </button>
        </div>

        <div style={{
          background: "#f8f9fa",
          padding: "16px",
          borderRadius: "12px",
          marginBottom: "24px",
          textAlign: "center"
        }}>
          <Text.Muted style={{ marginBottom: "4px" }}>Amount to Pay</Text.Muted>
          <div style={{ fontSize: "32px", fontWeight: 700 }}>
            ₹{amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </div>
        </div>

        {!selectedMethod ? (
          <div>
            <div style={{ marginBottom: "16px" }}>
              {PAYMENT_METHODS.map(method => (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  style={{
                    padding: "16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "12px",
                    marginBottom: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#000";
                    e.currentTarget.style.background = "#f8f9fa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e0e0e0";
                    e.currentTarget.style.background = "#fff";
                  }}
                >
                  <div style={{ fontSize: "32px" }}>{method.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "2px" }}>
                      {method.name}
                    </div>
                    <div style={{ fontSize: "13px", color: "#666" }}>
                      {method.description}
                    </div>
                  </div>
                  <div style={{ fontSize: "20px", color: "#999" }}>→</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedMethod(null)}
              style={{
                background: "none",
                border: "none",
                padding: "8px 0",
                marginBottom: "16px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#666",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}
            >
              ← Back to payment methods
            </button>

            {selectedMethod === "upi" && (
              <div>
                <Text.Label style={{ marginBottom: "8px", display: "block" }}>
                  UPI ID
                </Text.Label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  value={paymentDetails.upiId}
                  onChange={(e) => setPaymentDetails({
                    ...paymentDetails,
                    upiId: e.target.value
                  })}
                  style={{
                    width: "100%",
                    padding: "14px",
                    fontSize: "16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    outline: "none",
                    marginBottom: "16px"
                  }}
                />
              </div>
            )}

            {selectedMethod === "card" && (
              <div>
                <Text.Label style={{ marginBottom: "8px", display: "block" }}>
                  Card Number
                </Text.Label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => setPaymentDetails({
                    ...paymentDetails,
                    cardNumber: e.target.value
                  })}
                  style={{
                    width: "100%",
                    padding: "14px",
                    fontSize: "16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    outline: "none",
                    marginBottom: "12px"
                  }}
                />
                
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ flex: 1 }}>
                    <Text.Label style={{ marginBottom: "8px", display: "block" }}>
                      Expiry
                    </Text.Label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength="5"
                      value={paymentDetails.cardExpiry}
                      onChange={(e) => setPaymentDetails({
                        ...paymentDetails,
                        cardExpiry: e.target.value
                      })}
                      style={{
                        width: "100%",
                        padding: "14px",
                        fontSize: "16px",
                        border: "2px solid #e0e0e0",
                        borderRadius: "8px",
                        outline: "none"
                      }}
                    />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <Text.Label style={{ marginBottom: "8px", display: "block" }}>
                      CVV
                    </Text.Label>
                    <input
                      type="password"
                      placeholder="123"
                      maxLength="3"
                      value={paymentDetails.cardCvv}
                      onChange={(e) => setPaymentDetails({
                        ...paymentDetails,
                        cardCvv: e.target.value
                      })}
                      style={{
                        width: "100%",
                        padding: "14px",
                        fontSize: "16px",
                        border: "2px solid #e0e0e0",
                        borderRadius: "8px",
                        outline: "none"
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === "netbanking" && (
              <div>
                <Text.Label style={{ marginBottom: "8px", display: "block" }}>
                  Select Your Bank
                </Text.Label>
                <select
                  style={{
                    width: "100%",
                    padding: "14px",
                    fontSize: "16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    outline: "none",
                    marginBottom: "16px",
                    cursor: "pointer"
                  }}
                >
                  <option value="">Choose your bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                  <option value="kotak">Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            {selectedMethod === "wallet" && (
              <div>
                <Text.Label style={{ marginBottom: "8px", display: "block" }}>
                  Select Wallet
                </Text.Label>
                <select
                  style={{
                    width: "100%",
                    padding: "14px",
                    fontSize: "16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    outline: "none",
                    marginBottom: "16px",
                    cursor: "pointer"
                  }}
                >
                  <option value="">Choose your wallet</option>
                  <option value="paytm">Paytm</option>
                  <option value="phonepe">PhonePe</option>
                  <option value="gpay">Google Pay</option>
                  <option value="amazonpay">Amazon Pay</option>
                </select>
              </div>
            )}

            <Button 
              onClick={handlePayment}
              style={{ marginTop: "24px" }}
            >
              Pay ₹{amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </Button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </Modal>
  );
}