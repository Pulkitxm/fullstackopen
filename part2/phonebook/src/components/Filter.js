import noteServices from '../services/Notes'

const Filter = ({ setPersons, persons, updatedpersons }) => {
    const handleDelete = (person) => {
        if (window.confirm(`Do you want to delete ${person.name}?`)) {
            noteServices
            .del(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id));
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };


    return (
        <div>
            {updatedpersons.map(person => (
                <div key={person.id}>
                    <button onClick={() => handleDelete(person)}>Delete</button>
                    {person.name} {person.number}
                </div>
            ))}
        </div>
    );
};

export default Filter;
