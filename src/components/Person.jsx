/* eslint-disable react/prop-types */
import  { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
  
const Person = ({ person, updatePerson, deletePerson }) => {
  const [amount, setAmount] = useState(person.weeklyAmount);

  const addTransaction = () => {
    // Asegurarte de que el valor sea un número
    const value = parseInt(amount, 10);
    if (isNaN(value) || value <= 0) {
      toast.error('Por favor ingresa un valor numérico válido.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (value !== person.weeklyAmount) {
      toast.error(`El monto debe ser ${person.weeklyAmount}.`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    // Si la validación pasa, agregamos la transacción
    const newTransactions = [
      ...person.transactions,
      { id: Date.now(), amount: value, registrationDate: new Date().toLocaleString() }
    ];

    updatePerson(person.id, newTransactions);
    setAmount(person.weeklyAmount);
  };

  
    const removeTransaction = (transactionId) => {
      const newTransactions = person.transactions.filter((t) => t.id !== transactionId);
      updatePerson(person.id, newTransactions);
    };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h5 className="text-lg font-bold">{person.name}</h5>
      <p className="text-gray-600">Total: ${person.total}</p>
      <ul className="list-disc ml-5">
        {person.transactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between">
        <p>{"o"}<b> ${transaction.amount}{" "}</b> - <small className="text-gray-400">{transaction.registrationDate}</small></p>   
            <button
              className="text-red-600 hover:underline"
              onClick={() => removeTransaction(transaction.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex gap-2">
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          readOnly
          onChange={(e) => setAmount(e.target.value)}
          className="flex-grow border border-gray-300 rounded p-2"
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={addTransaction}
        >
          Agregar
        </button>
      </div>
      <button
        className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        onClick={() => deletePerson(person.id)}
      >
        Eliminar Persona
      </button>
      <ToastContainer />
    </div>
  );
};

export default Person;
