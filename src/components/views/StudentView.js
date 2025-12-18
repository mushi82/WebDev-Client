/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, deleteStudent } = props;
  
  // Check if student exists
  if (!student) return null;

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px' }}>
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center',
      }}>
        <h1 style={{ margin: '0 0 15px 0' }}>
          {student.firstname + " " + student.lastname}
        </h1>

        {student.imageURL && student.imageURL.trim() && (
          <img
            src={student.imageURL}
            alt="Student"
            style={{ 
              width: "200px", 
              height: "150px", 
              objectFit: "cover",
              borderRadius: '5px',
              marginTop: '10px'
            }}
          />
        )}

        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>GPA:</strong> {student.gpa || "N/A"}</p>
        
        {/* Campus Information */}
        {student.campus ? (
          <div>
            <p><strong>Campus:</strong></p>
            <Link to={`/campus/${student.campus.id}`}>
              <h3 style={{ color: '#4B0082', margin: '5px 0' }}>
                {student.campus.name}
              </h3>
            </Link>
          </div>
        ) : (
          <p style={{ fontStyle: 'italic', color: '#666' }}>
            This student is not enrolled in a campus
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        justifyContent: 'center',
        marginBottom: '20px' 
      }}>
        <Link to={`/student/${student.id}/edit`}>
          <button style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontFamily: 'Tahoma'
          }}>
            Edit Student
          </button>
        </Link>

        <button 
          onClick={() => {
            if (window.confirm(`Delete ${student.firstname} ${student.lastname}?`)) {
              deleteStudent(student.id);
            }
          }}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#000000ff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontFamily: 'Tahoma'
          }}>
          Delete Student
        </button>
      </div>
    </div>
  );
};

export default StudentView;