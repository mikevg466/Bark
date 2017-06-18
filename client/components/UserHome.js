import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PetSwipe from './PetSwipe';
import { addInterest, addReject } from '../redux/userPet';
import { selectRandomPet } from '../redux/pet';

class UserHome extends React.Component{
  constructor(){
    super();
    this.onAddToInterest = this.onAddToInterest.bind(this);
    this.onAddToReject = this.onAddToReject.bind(this);
  }

  onAddToInterest(){
    this.props.addToInterest()
      .then(() => this.props.updateSelectedPet())
      .catch(console.error.bind(console));
  }

  onAddToReject(){
    this.props.addToReject()
      .then(() => this.props.updateSelectedPet())
      .catch(console.error.bind(console));
  }

  render(){
    return (
      <div>
        <div className="row">
        <div className="col-sm-2" ></div>
        <div className="col-sm-8" >
          <PetSwipe
            selectedPet={ this.props.selectedPet }
            addToInterest={ this.onAddToInterest }
            addToReject={ this.onAddToReject }
          />
        </div>
        <div className="col-sm-2" ></div>
        </div>
      </div>
    );
  }
};

const mapState = state => ({
  email: state.user.email,
  selectedPet: state.pet.selectedPet
});

const mapDispatch = dispatch => ({
  addToInterest: () => dispatch(addInterest()),
  addToReject: () => dispatch(addReject()),
  updateSelectedPet: () => dispatch(selectRandomPet())
});

export default connect(mapState, mapDispatch)(UserHome);

UserHome.propTypes = {
  email: PropTypes.string,
  selectedPet: PropTypes.object
};
