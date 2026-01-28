import { useOnRampStore } from "../onrampStore";

const METHODS = ["UPI", "Card", "Net Banking"];

export default function PaymentMethodSelector() {
  const { paymentMethod, selectPaymentMethod } = useOnRampStore();

  return (
    <div>
      <label>Payment Method</label>
      {METHODS.map((method) => (
        <label key={method} style={{ marginRight: 12 }}>
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === method}
            onChange={() => selectPaymentMethod(method)}
          />
          {method}
        </label>
      ))}
    </div>
  );
}