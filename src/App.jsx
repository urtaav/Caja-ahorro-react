import AddPerson from "./components/AddPerson";
import PersonList from "./components/PersonList";
import useLocalStorage from "./hooks/useLocalStorage";
import { formatNumber } from "./utils";
import { ToastContainer, toast } from "react-toastify";
function App() {
  // Usar el hook para manejar el estado persistente
  const [people, setPeople] = useLocalStorage("people", []); // 'people' es la clave en localStorage

  const addPerson = (name, weeklyAmount) => {
    const newPerson = {
      id: Date.now(),
      name,
      transactions: [],
      total: 0,
      weeklyAmount,
      registrationDate: new Date().toLocaleString(), // Fecha de registro
    };
    const updatedPeople = [...people, newPerson];

    // Actualizar el estado
    setPeople(updatedPeople);
    toast.success(`${name} se unio a ahorradores 2025!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const updatePerson = (id, transactions) => {
    const updatedPeople = people.map((person) =>
      person.id === id
        ? {
            ...person,
            transactions,
            total: transactions.reduce((acc, t) => acc + t.amount, 0),
          }
        : person
    );
    setPeople(updatedPeople);
  };

  const deletePerson = (id) => {
    const personToRemove = people.find((p) => p.id === id);

    // Verificar si la persona tiene transacciones
    if (personToRemove.transactions.length > 0) {
      toast.warn(`No se puede eliminar a una persona con transacciones registradas.`, {
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
  
    // Si no tiene transacciones, eliminar la persona
    const updatedPeople = people.filter((p) => p.id !== id);
    setPeople(updatedPeople);
  };

  // Calcular el total de ahorro
  const calculateTotal = () => {
    return people.reduce((acc, person) => acc + person.total, 0);
  };

  // Calcular el objetivo total de ahorro
  const totalGoal = people.reduce(
    (acc, person) => acc + person.weeklyAmount * 52,
    0
  );

  const totalSaved = calculateTotal();

  const totalRemaining = totalGoal - totalSaved;

  const calculateTotalSaved = (people) => {
    return people.reduce((acc, p) => {
      return acc + (p.total || 0); // Sumar el valor de `total` o 0 si no está definido
    }, 0); // El valor inicial de `acc` es 0
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">
          Caja de Ahorro
        </h1>

        {/* Formulario de agregar persona */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mb-8">
          <AddPerson addPerson={addPerson} />
        </div>

        {/* Barra de progreso */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mb-8">
          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              Ahorro Actual ${formatNumber(calculateTotalSaved(people))}
            </h3>
            <p className="text-lg text-gray-600">
              Meta Total: ${formatNumber(totalGoal)} ✈️🛍️🎁
            </p>
            <p className="text-green-500 font-semibold">
              Lo que falta: ${formatNumber(totalRemaining)}
            </p>
          </div>

          {/* Barra de progreso */}
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="font-semibold text-sm text-gray-600">
                  Progreso
                </span>
              </div>
              <div>
                <span className="font-semibold text-sm text-gray-600">
                  {totalSaved} / {totalGoal}
                </span>
              </div>
            </div>
            <div className="flex mb-2 items-center justify-between">
              <div className="w-full bg-gray-300 rounded-full">
                <div
                  className="bg-green-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: `${(totalSaved / totalGoal) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de personas */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mb-8">
          <PersonList
            people={people}
            updatePerson={updatePerson}
            deletePerson={deletePerson}
          />
        </div>

        {/* Total General */}
        <h3 className="text-2xl font-semibold mt-8 text-center text-blue-600">
          Total General: ${formatNumber(calculateTotalSaved(people))}
        </h3>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
