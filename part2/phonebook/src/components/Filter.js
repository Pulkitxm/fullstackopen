const Filter = ({ updatedpersons }) => {
    return (
        <div>
            {updatedpersons.map((person) => (
                <div key={person.number}>
                 {person.name} {person.number}
                </div>
            ))}
        </div>
    );
};

export default Filter;