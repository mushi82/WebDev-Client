/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      email: "",
      campusId: null, 
      redirect: false, 
      redirectId: null,
      imageUrl: '',
      gpa: '',
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  
    if (!this.state.firstname || this.state.firstname.trim() === '') {
      alert("Invalid First Name");
      return;
    }
    if (!this.state.lastname || this.state.lastname.trim() === '') {
      alert("Invalid Last Name");
      return;
    }
    if (!this.state.email || this.state.email.trim() === '') {
      alert("Invalid Email");
      return;
    }
    if (this.state.gpa && (isNaN(this.state.gpa) || this.state.gpa < 0 || this.state.gpa > 4)) {
      alert("Please only choose a number between 0 and 4");
      return;
    }

    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        campusId: this.state.campusId || null,
        imageUrl: this.state.imageUrl,
        gpa: this.state.gpa || null,
    };
    
    // Add new student in back-end database
    let newStudent = await this.props.addStudent(student);

    // Error handling
    if (!newStudent) {
      alert("Failed to add student. Try Again!");
      return;
    }

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "", 
      lastname: "", 
      email: "",
      campusId: null, 
      redirect: true, 
      redirectId: newStudent.id,
      imageUrl: '',
      gpa: '',
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}      
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(NewStudentContainer);