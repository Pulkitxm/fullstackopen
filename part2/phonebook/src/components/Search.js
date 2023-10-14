const Search = ({ search, handlechange_search }) =>{
    return(
        <form action="">
            filter shown with <input value={search} onChange={handlechange_search} />
        </form>
    )
}
export default Search