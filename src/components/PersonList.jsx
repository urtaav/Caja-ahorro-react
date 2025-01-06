/* eslint-disable react/prop-types */
import Person from "./Person"
const PersonList = ({people,updatePerson,deletePerson}) => {
  return (
    <div className="space-y-4">
      {people.map((person) => (
     
        <Person
          key={person.id}
          person={person}
          updatePerson={updatePerson}
          deletePerson={deletePerson}
        />
      ))}
    </div>
  )
}

export default PersonList
