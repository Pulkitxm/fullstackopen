const PersonForm = ({ addperson, newName, handlechange_person, newNumber, handlechange_number }) => {
    return (
        <form>
            <div>
                name: <input value={newName} placeholder="Enter a name" onChange={handlechange_person} />
            </div>
            <div>
                number: <input type='number' value={newNumber} placeholder="Enter a number" onChange={handlechange_number} />
            </div>
            <button type="submit" onClick={addperson} >add</button>
        </form>
    )
}

export default PersonForm