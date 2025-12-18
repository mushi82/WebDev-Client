/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any). 
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const { campus, deleteCampus } = props;
  
  if (!campus || !campus.students) return null;
  
  const hasStudents = campus.students.length > 0;

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px' }}>
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: '0 0 15px 0' }}>{campus.name}</h1>
        <p><strong>Campus ID:</strong> {campus.id}</p>
        <p><strong>Address:</strong> {campus.address}</p>
        <p><strong>Description:</strong> {campus.description}</p>
        
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
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Link to={`/campus/${campus.id}/edit`}>
          <button style={{ 
            marginRight: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            color: 'white',
            backgroundColor: 'black',
            fontFamily: 'Tahoma',
            border: 'none',          
            borderRadius: '5px'       
          }}>
            Edit Campus
          </button>
        </Link>

        <button 
          onClick={() => {
            if (window.confirm(`Delete ${campus.name}?`)) {
              deleteCampus(campus.id);
            }
          }}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#000000ff',
            color: 'white',
            fontFamily: 'Tahoma',
            border: 'none',
            borderRadius: '5px'
          }}>
          Delete Campus
        </button>
      </div>

      <hr style={{ margin: '30px 0' }} />

      <h2>Students at this Campus</h2>

      {!hasStudents ? (
        <p style={{ 
          fontSize: '15px',
          fontStyle: 'bold',
          color: '#b5b5b5ff',
          padding: '20px',
          backgroundColor: '#ffffffff',
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          There are no students attending this campus.
        </p>
      ) : (
        <div>
          {campus.students.map((student) => (
            <div 
              key={student.id} 
              style={{ 
                padding: '15px',
                marginBottom: '10px',
                backgroundColor: '#fafafa',
                borderRadius: '5px',
                border: '1px solid #ddd'
              }}>
              <Link to={`/student/${student.id}`}>
                <h3 style={{ margin: '0 0 10px 0' }}>
                  {student.firstname + " " + student.lastname}
                </h3>
              </Link>
              <button 
                onClick={() => props.deleteStudent(student.id)}
                style={{
                  padding: '6px 12px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                Unenroll Student
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <Link to="/newstudent">
          <button style={{ 
            padding: '10px 20px',
            fontSize: '18px',
            cursor: 'pointer',
            backgroundColor: '#000000ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}>
            Add New Student
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CampusView;