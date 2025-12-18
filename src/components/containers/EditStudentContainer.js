/*==================================================
EditStudentContainer.js
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
      id: null,
      campusId: "",
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

  // Get the student data
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
  }

  // Update state with student data
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
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // what to do after submit is clicked
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

    // Edit student information in the backend as well
    await this.props.editStudent(student);
    this.setState({
      redirect: true,
      redirectId: student.id
    });
  };


  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  // Rendering the edit student form
  render() {
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


const mapState = (state) => {
  return {
    student: state.student
  };
};

// Mapping dispatch
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student))
  };
};

export default connect(mapState, mapDispatch)(EditStudentContainer);