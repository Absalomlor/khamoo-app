const SearchPosts = ({ setSearchQuery }) => {
    return (
      <input
        type="text"
        placeholder="Search posts..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    );
  };
  
  export default SearchPosts;
  