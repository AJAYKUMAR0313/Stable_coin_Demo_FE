import { useEffect, useState } from "react";
import { useOfframpStore } from "../offrampStore";
import BankAccountForm from "./BankAccountForm";

export default function BankAccountSelector() {
  const { 
    savedBankAccounts, 
    selectedBankAccount, 
    selectBankAccount, 
    loadSavedBankAccounts 
  } = useOfframpStore();

  const [showAddNew, setShowAddNew] = useState(false);

  useEffect(() => {
    loadSavedBankAccounts();
  }, []);

  const handleSelectAccount = (account) => {
    selectBankAccount(account);
    setShowAddNew(false);
  };

  const handleAddNewClick = () => {
    setShowAddNew(true);
    selectBankAccount(null);
  };

  const handleBackToSaved = () => {
    setShowAddNew(false);
  };

  // If showing add new form
  if (showAddNew) {
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm font-semibold text-gray-700">
            Add New Bank Account
          </label>
          {savedBankAccounts.length > 0 && (
            <button
              onClick={handleBackToSaved}
              className="text-sm text-gray-600 hover:text-black underline"
            >
              ← Use saved account
            </button>
          )}
        </div>
        <BankAccountForm />
      </div>
    );
  }

  // Show saved accounts
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Bank Account
      </label>

      {/* Saved Accounts List */}
      {savedBankAccounts.length > 0 && (
        <div className="space-y-3 mb-3">
          {savedBankAccounts.map(account => (
            <div
              key={account.id}
              onClick={() => handleSelectAccount(account)}
              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                selectedBankAccount?.id === account.id
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-400 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedBankAccount?.id === account.id
                    ? "border-black bg-black"
                    : "border-gray-300 bg-white"
                }`}>
                  {selectedBankAccount?.id === account.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="text-base font-semibold text-gray-900 mb-1">
                    {account.bankName} - {account.accountNumber}
                  </div>
                  <div className="text-sm text-gray-600">
                    {account.accountHolder}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    IFSC: {account.ifscCode} • {account.accountType}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Account Button */}
      <button
        onClick={handleAddNewClick}
        className="w-full py-3.5 px-4 border-2 border-dashed border-gray-300 rounded-xl bg-white text-gray-600 hover:border-black hover:text-black text-sm flex items-center justify-center gap-2 transition-all"
      >
        <span className="text-lg">+</span>
        Add New Bank Account
      </button>
    </div>
  );
}