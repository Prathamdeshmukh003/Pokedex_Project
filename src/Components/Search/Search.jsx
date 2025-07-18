import UseDebounce from '../../Hooks/UseDebounce';
import './Search.css';

function Search({updateSearchTerm}){
    const deBouncedCallback = UseDebounce((e)=>updateSearchTerm(e.target.value));

    return (
        <div className='search-wrapper'>
            <input
                id='pokemon-name-search'
                type="text"
                placeholder="Pokemon name...."
                onChange={deBouncedCallback}
            />
            <button className='search'>Search</button>
        </div>
    )
}

export default Search;