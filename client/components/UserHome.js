import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PetSwipe from './PetSwipe';

const UserHome = props => {

  const { email } = props;

  return (
    <div>
      <div className="row">
      <div className="col-sm-2" ></div>
      <div className="col-sm-8" >
        <PetSwipe selectedPet={ props.selectedPet } />
      </div>
      <div className="col-sm-2" ></div>
      </div>
    </div>
  );
};

const mapState = state => ({
  email: state.user.email,
  selectedPet: state.pet.selectedPet
});

export default connect(mapState)(UserHome);

UserHome.propTypes = {
  email: PropTypes.string,
  selectedPet: PropTypes.object
};
