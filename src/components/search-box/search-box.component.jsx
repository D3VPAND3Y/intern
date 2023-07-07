import './search-box.styles.css';
const SearchBox = (props)=>{
  const { placeholder, onChangeHandler, className } = props;
  return(
    <input
        className={className}
        type="search"
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
  )
}

export default SearchBox;