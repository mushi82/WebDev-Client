/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchStudentThunk, editStudentThunk } from '../../store/thunks';

import EditStudentView from '../views/EditStudentView';

class EditStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      campusId: null,
      email: "",
      imageURL: "",
      gpa: "",
      redirect: false,
      redirectId: null
    };
  }

  // Get the student data from back-end database
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
  }

  // Update state with student data once it's loaded
  componentDidUpdate(prevProps) {
    if (prevProps.student !== this.props.student && this.props.student) {
      this.setState({
        firstname: this.props.student.firstname || "",
        lastname: this.props.student.lastname || "",
        campusId: this.props.student.campusId || null,
        email: this.props.student.email || "",
        imageURL: this.props.student.imageURL || "",
        gpa: this.props.student.gpa || ""
      });
    }
  }

  // Capture input data when it is entered
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // Take action after user clicks the submit button
  handleSubmit = async (event) => {
    event.preventDefault();

    let student = {
      id: this.props.match.params.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      campusId: this.state.campusId,
      email: this.state.email,
      imageURL: this.state.imageURL,
      gpa: this.state.gpa
    };

    // Edit student in back-end database
    await this.props.editStudent(student);

    // Update state, and trigger redirect to show the updated student
    this.setState({
      redirect: true,
      redirectId: student.id
    });
  };

  // Unmount when the component is being removed from the DOM
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  // Render edit student input form
  render() {
    // Redirect to student page after submit
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <Header />
        <EditStudentView
          student={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

// Map state to props
const mapState = (state) => {
  return {
    student: state.student
  };
};

// Map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student))
  };
};

export default connect(mapState, mapDispatch)(EditStudentContainer);