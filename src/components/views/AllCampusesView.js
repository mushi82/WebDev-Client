/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addCampus, editCampus } from "../../store/actions/actionCreators";

const AllCampusesView = (props) => {
  
  // If there are no campuses, show this
  if (!props.allCampuses.length) {
    return (
      <div>
        <p style={{ fontSize: "30px" }}>There are no campuses.</p>
        <Link to="/newcampus">
          <button style={{ fontSize: "20px" }}>Add New Campus</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>All Campuses</h1>

      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          
          {campus.imageURL && campus.imageURL.trim() && (
            <img
              src={campus.imageURL}
              alt="Campus"
              style={{ 
                width: "200px", 
                height: "150px", 
                objectFit: "cover",
                borderRadius: '5px',
                marginTop: '10px'
              }}
            />
          )}
          
          <h4>Campus ID: {campus.id}</h4>
          <p>{campus.address}</p>
          <p>{campus.description}</p>
          <hr/>
        </div>
      ))}
            <br/>
            <Link to="/newcampus">
              <button 
                style={{ 
                  padding: '10px 20px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  backgroundColor: '#000000ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px'
                }}>
                Add New Campus
              </button>
            </Link>
            <br/><br/>
          </div>
        );
      };

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;