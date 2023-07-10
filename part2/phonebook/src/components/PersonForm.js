const PersonForm = ({ addperson, newName, handlechange_person, newNumber, handlechange_number }) => {
    return (
        <form>
            <div>
                name: <input value={newName} onChange={handlechange_person} />
            </div>
            <div>
                number: <input type='number' value={newNumber} onChange={handlechange_number} />
            </div>
            <button type="submit" onClick={addperson} >add</button>
        </form>
    )
}

export default PersonForm