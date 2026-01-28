import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { useState } from "react";

export default function PaymentModal({ open, amount, onConfirm }) {
  const [success, setSuccess] = useState(false);

  const pay = () => {
    setTimeout(() => {
      setSuccess(true);
      setTimeout(onConfirm, 700);
    }, 700);
  };

  return (
    <Modal open={open}>
      {!success ? (
        <>
          <Text.Title>Confirm Purchase</Text.Title>
          <Text.Hero>₹{amount}</Text.Hero>
          <Button onClick={pay}>Pay</Button>
        </>
      ) : (
        <Text.Title>✓ Payment successful</Text.Title>
      )}
    </Modal>
  );
}