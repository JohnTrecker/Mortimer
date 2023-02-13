const Search = ({search, clear}) => {
    return (
        <div className="flex flex-row justify-center">
            <input
                type="search"
                onChange={search}
                className="w-7/12 h-12 p-1 m-2"
                onAbort={clear}
                placeholder="Search topics"
                autoFocus
            />
        </div>
    )
}

export default Search;