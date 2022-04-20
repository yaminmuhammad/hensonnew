import { Button } from "@mui/material";

const SearchBar = ({ getSearch, getData, query }) => {
    return <div>
        <input type="search" onChange={getSearch} />
        <Button
            variant="contained"
            type="submit"
            value="Search Gif"
            onClick={getData}
        >
            Search Gif
        </Button>
    </div>
};

export default SearchBar;