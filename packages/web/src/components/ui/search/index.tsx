import SearchIcon from '../../../assets/svg/search-icon.svg';

const Search = () => {
  return (
    <div className="flex items-center">
      <button
        type="button"
        className="focus:outline-none text-black hover:text-blue-500"
      >
        <SearchIcon className="stroke-current hover:stroke-current " />
      </button>
    </div>
  );
};

export default Search;
