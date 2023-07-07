import "./card-list.styles.css";
import { Table } from "reactstrap";

const CardList = (props) => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>UserName</th>
            <th>Email</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
        {props.users.map((getData, i) => {
            return (
              <tr key={i}>
                <td>{getData.id}</td>
                <td>{getData.name}</td>
                <td>{getData.username}</td>
                <td>{getData.email}</td>
                <td>{getData.address.city}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default CardList;