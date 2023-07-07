import { useEffect, useState } from "react";
import SearchBox from "./components/search-box/search-box.component";
import CardList from "./components/card-list/card-list.component";
import "./App.css"

function App() {

  const handleSorting = (x) => {
    let sortedUsers = [...users];


    sortedUsers.sort((a, b) => {
      if (a[x] < b[x]) {
        return -1;
      }
      if (a[x] > b[x]) {
        return 1;
      }
      return 0;
    });
    setUsers(sortedUsers);
  };

  const handleSortByCity = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) => a.address.city.localeCompare(b.address.city));
    setFilteredUsers(sortedUsers);
  };

  const [searchField, setSearchField] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredUsers,setFilteredUsers]=useState(users);


  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

  }, []);

  useEffect(()=>{
    const newFilterMonsters = users.filter(monster => monster.name.toLowerCase().includes(searchField.toLowerCase()));

    setFilteredUsers(newFilterMonsters);

  },[users,searchField])
  const onsearchChange = (event) => {
        const searchFieldString = event.target.value.toLowerCase();
        setSearchField(searchFieldString);
  }

  const totalCount = filteredUsers.length;

  if (error) {
    return <h1 className="error-component">Error: {error.message}</h1>;
  }
  else if(loading){
    return <h2 className="loading-component">loading......</h2>
  }
  else{
    return (
      <div className="App">
      <h1 className='Heading'>User Data</h1>
      <div className="sorting-buttons-component">
      <SearchBox onChangeHandler={onsearchChange} placeholder='search by name' className='search'/>
      <div className="sorting-buttons">
        <button className="sort-button" onClick={() => handleSorting("id")}>Sort by Id</button>
        <button className="sort-button" onClick={() => handleSorting("name")}>Sort by Name</button>
        <button className="sort-button" onClick={handleSortByCity}>Sort by City</button>
      </div>
      </div>

      <CardList  users={filteredUsers} />
      <h2 className="total-count">Total Count: {totalCount}</h2>
    </div>


    );
  }
}

export default App;


