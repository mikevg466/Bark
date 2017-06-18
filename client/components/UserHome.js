import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PetSwipe from './PetSwipe';
import { addInterest, addReject } from '../redux/userPet';

class UserHome extends React.Component{
  constructor(){
    super();
  }

  render(){
    return (
      <div>
        <div className="row">
        <div className="col-sm-2" ></div>
        <div className="col-sm-8" >
          <PetSwipe
            selectedPet={ this.props.selectedPet }
            addToInterest={ this.props.addToInterest }
            addToReject={ this.props.addToReject }
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
  addToReject: () => dispatch(addReject())
});

export default connect(mapState, mapDispatch)(UserHome);

UserHome.propTypes = {
  email: PropTypes.string,
  selectedPet: PropTypes.object
};
