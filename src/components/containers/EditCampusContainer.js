/*==================================================
EditCampusContainer.js
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';
import EditCampusView from '../views/EditCampusView';


class EditCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageURL: "",
      redirect: false,
      redirectId: null,
      campusId: null,
    };
  }


  // Get the campus data
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id);

  }
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }
  // Update information
  componentDidUpdate(prevProps) {
    if (prevProps.campus !== this.props.campus && this.props.campus) {
        const campusId = this.props.match.params.id;
        if (campusId){
            this.props.fetchCampus(campusId);
        }
    }
    if (
      (prevProps.campus.id !== this.props.campus.id && this.props.campus.id) ||
      (this.state.campusId === null && this.props.campus.id)
    ) {
    this.setState({
        name: this.props.campus.name || "",
        address: this.props.campus.address || "",
        description: this.props.campus.description || "",
        imageURL: this.props.campus.imageURL || "",
        campusId: this.props.campus.id,
        redirectId: this.props.campus.id,
      });
    }
  }



  // take input
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  // what to do when submit is clicked
  handleSubmit = async (event) => {
    event.preventDefault();

    let campus = {
      campusId: this.props.match.params.campusId,
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      imageURL: this.state.imageURL
    };

    // Edit campus
    let editedCampus = await this.props.editCampus(campus);
    this.setState({
      name: "",
      address: "",
      description: "",
      imageURL: "",
      campusID: null,
      redirect: true,
      redirectId: editedCampus.id
    });
  };



  // Render edit campus input form
  render() {
    // Redirect to campus page after submit
    if (this.state.redirect) {
      return <Redirect to={`/campus/${this.state.redirectId}`} />;
    }
    return (
      <div>
        <Header />
        <EditCampusView
          campus={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}


const mapState = (state) => {
  return {
    campus: state.campus
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus))
  };
};


export default connect(mapState, mapDispatch)(EditCampusContainer);