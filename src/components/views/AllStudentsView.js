/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */

import { Link } from "react-router-dom";

const AllStudentsView = (props) => {
  const {students} = props;
  
  // If there is no student, display a message
  if (!students.length) {
    return (
      <div>
        <p>There are no students.</p>
        <Link to={`/newstudent`}>
          <button>Add New Student</button>
        </Link>
      </div>
    );
  }
  
  // If there is at least one student, render All Students view 
  return (
    <div>
      <hr style={{ margin: '30px 0' }} />
      <h1>Student List</h1>

      {students.map((student) => (
        <div key={student.id} style={{ 
          padding: '15px',
          marginBottom: '10px',
          backgroundColor: '#f5f5f5',
          borderRadius: '15px'
        }}>
          <Link to={`/student/${student.id}`}>
            <h2>{student.firstname} {student.lastname}</h2>
          </Link>
          
          {student.imageUrl && student.imageUrl.trim() && (
            <img
              src={student.imageUrl}
              alt={`${student.firstname} ${student.lastname}`}
              style={{ 
                width: "150px", 
                height: "150px", 
                objectFit: "cover",
                borderRadius: '50%',
                marginTop: '10px'
              }}
            />
          )}
          
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>GPA:</strong> {student.gpa || "N/A"}</p>
          
          {student.campus ? (
            <p><strong>Campus:</strong> {student.campus.name}</p>
          ) : (
            <p style={{ fontStyle: 'italic', color: '#666' }}>
              Not enrolled in a campus
            </p>
          )}
        </div>
      ))}

      <Link to={`/newstudent`}>
        <button style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#000000',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          marginTop: '20px',
          fontWeight: '700px'
        }}>
          Add New Student
        </button>
      </Link>
    </div>
  );
};

export default AllStudentsView;