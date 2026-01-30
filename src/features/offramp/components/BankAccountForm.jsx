import { useState } from "react";
import { useOfframpStore } from "../offrampStore";

export default function BankAccountForm() {
  const { newBankAccount, setNewBankAccount, selectBankAccount } = useOfframpStore();

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "accountHolder":
        if (!value) return "Account holder name is required";
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Only letters and spaces allowed";
        return null;

      case "accountNumber":
        if (!value) return "Account number is required";
        if (!/^\d{9,18}$/.test(value)) return "Must be 9-18 digits";
        return null;

      case "ifscCode":
        if (!value) return "IFSC code is required";
        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value.toUpperCase())) {
          return "Invalid IFSC format (e.g., SBIN0001234)";
        }
        return null;

      case "bankName":
        if (!value) return "Bank name is required";
        return null;

      case "accountType":
        if (!value) return "Account type is required";
        return null;

      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setNewBankAccount({
      ...newBankAccount,
      [name]: value
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error
    });

    selectBankAccount({
      ...newBankAccount,
      [name]: value,
      id: "new_account"
    });
  };

  const isValid = () => {
    return (
      newBankAccount.accountHolder &&
      newBankAccount.accountNumber &&
      newBankAccount.ifscCode &&
      newBankAccount.bankName &&
      newBankAccount.accountType &&
      Object.values(errors).every(error => !error)
    );
  };

  return (
    <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl space-y-4">
      {/* Account Holder Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Account Holder Name
        </label>
        <input
          type="text"
          name="accountHolder"
          value={newBankAccount.accountHolder}
          onChange={handleChange}
          placeholder="John Doe"
          className={`w-full px-3 py-2 text-sm border-2 rounded-lg focus:outline-none ${
            errors.accountHolder ? "border-red-500" : "border-gray-200 focus:border-black"
          }`}
        />
        {errors.accountHolder && (
          <p className="mt-1 text-xs text-red-600">{errors.accountHolder}</p>
        )}
      </div>

      {/* Account Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Account Number
        </label>
        <input
          type="text"
          name="accountNumber"
          value={newBankAccount.accountNumber}
          onChange={handleChange}
          placeholder="1234567890"
          maxLength="18"
          className={`w-full px-3 py-2 text-sm font-mono border-2 rounded-lg focus:outline-none ${
            errors.accountNumber ? "border-red-500" : "border-gray-200 focus:border-black"
          }`}
        />
        {errors.accountNumber && (
          <p className="mt-1 text-xs text-red-600">{errors.accountNumber}</p>
        )}
      </div>

      {/* IFSC Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          IFSC Code
        </label>
        <input
          type="text"
          name="ifscCode"
          value={newBankAccount.ifscCode}
          onChange={handleChange}
          placeholder="SBIN0001234"
          maxLength="11"
          className={`w-full px-3 py-2 text-sm font-mono uppercase border-2 rounded-lg focus:outline-none ${
            errors.ifscCode ? "border-red-500" : "border-gray-200 focus:border-black"
          }`}
        />
        {errors.ifscCode && (
          <p className="mt-1 text-xs text-red-600">{errors.ifscCode}</p>
        )}
      </div>

      {/* Bank Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bank Name
        </label>
        <input
          type="text"
          name="bankName"
          value={newBankAccount.bankName}
          onChange={handleChange}
          placeholder="State Bank of India"
          className={`w-full px-3 py-2 text-sm border-2 rounded-lg focus:outline-none ${
            errors.bankName ? "border-red-500" : "border-gray-200 focus:border-black"
          }`}
        />
        {errors.bankName && (
          <p className="mt-1 text-xs text-red-600">{errors.bankName}</p>
        )}
      </div>

      {/* Account Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Account Type
        </label>
        <select
          name="accountType"
          value={newBankAccount.accountType}
          onChange={handleChange}
          className={`w-full px-3 py-2 text-sm border-2 rounded-lg focus:outline-none cursor-pointer bg-white ${
            errors.accountType ? "border-red-500" : "border-gray-200 focus:border-black"
          }`}
        >
          <option value="">Select account type</option>
          <option value="Savings">Savings</option>
          <option value="Current">Current</option>
        </select>
        {errors.accountType && (
          <p className="mt-1 text-xs text-red-600">{errors.accountType}</p>
        )}
      </div>

      {/* Validation Status */}
      {isValid() && (
        <div className="p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700 flex items-center gap-2">
          <span>✓</span>
          <span>Bank account details verified</span>
        </div>
      )}
    </div>
  );
}