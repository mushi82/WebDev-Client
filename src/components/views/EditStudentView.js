/*==================================================
EditStudentView.js
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles(() => ({
  formContainer: {
    width: '500px',
    backgroundColor: '#000000ff',
    borderRadius: '25px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  },
  customizeAppBar: {
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle: {
    backgroundColor: '#000000ff',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '25px 25px 0px 0px',
    padding: '3px'
  },
}));

const EditStudentView = (props) => {
  const { handleChange, handleSubmit, student } = props;
  const classes = useStyles();

  // Edit Student Form
  return (
    <div>
      <h1>Edit Student</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{ 
                fontWeight: "bold", 
                fontFamily: "Courier, sans-serif", 
                fontSize: "20px", 
                color: "#ffffffff" }}>
              Edit Student Information
            </Typography>
          </div>
          <form style={{ textAlign: 'center' }} onSubmit={(e) => handleSubmit(e)}>

            <label style={{ color: '#ffffffff', fontWeight: 'bold' }}>First Name: </label>
            <input 
              type="text" 
              name="firstname" 
              value={student.firstname} 
              onChange={(e) => handleChange(e)} 
              required 
            />
            <br />
            <br />

            <label style={{ color: '#ffffffff', fontWeight: 'bold' }}>Last Name: </label>
            <input 
              type="text" 
              name="lastname" 
              value={student.lastname} 
              onChange={(e) => handleChange(e)} 
              required 
            />
            <br />
            <br />

            <label style={{ color: '#ffffffff', fontWeight: 'bold' }}>Email: </label>
            <input 
              type="email" 
              name="email" 
              value={student.email} 
              placeholder="student@example.com" 
              onChange={(e) => handleChange(e)} 
              required 
            />
            <br />
            <br />

            <label style={{ color: '#ffffffff', fontWeight: 'bold' }}>GPA: </label>
            <input 
              type="number" 
              name="gpa" 
              value={student.gpa || ""} 
              step="0.01" 
              max="4" 
              min="0" 
              placeholder="0.00 - 4.00" 
              onChange={(e) => handleChange(e)} 
            />
            <br />
            <br />

            <label style={{ color: '#ffffffff', fontWeight: 'bold' }}>Image URL: </label>
            <input 
              type="text" 
              name="imageURL" 
              value={student.imageURL || ""} 
              placeholder="Optional Link" 
              onChange={(e) => handleChange(e)} 
            />
            <br />
            <br />

            <label style={{ color: '#ffffffff', fontWeight: 'bold' }}>Campus ID: </label>
            <input 
              type="number" 
              name="campusId" 
              value={student.campusId || ""} 
              placeholder="Optional" 
              onChange={(e) => handleChange(e)} 
            />
            <br />
            <br />

            <Button variant="contained" color="white" type="submit" borderRadius='50px'>
              Submit
            </Button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditStudentView;