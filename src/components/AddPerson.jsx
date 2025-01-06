import { useState } from "react";
/* eslint-disable react/prop-types */
const AddPerson = ({ addPerson }) => {
  const [name, setName] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(200); // Valor predeterminado 200

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addPerson(name.trim(),selectedAmount);
      setName("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-grow border border-gray-300 rounded p-2"
        />
           <select
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded"
          >
            <option value={200}>200</option>
            <option value={500}>500</option>
          </select>
        <button
          type="submit"
          disabled={!name.trim()}
          className={`mt-4 px-4 py-2 rounded-md text-white ${
            name.trim()
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Agregar
        </button>
      </div>
    </form>
  );
};

export default AddPerson;
