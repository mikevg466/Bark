import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PetSwipe from '../components/PetSwipe';
import { addInterest, addReject } from '../redux/userPet';
import { selectRandomPet } from '../redux/pet';
import MessageList from './MessageList';
import Navbar from '../components/Navbar';

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
        <Navbar />
        {
          this.props.userType === 'BASIC' ?
            (
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
            ) :
            this.props.userType === 'ADOPTER' ?
            (
              <MessageList />
            ) :
            null
        }
      </div>
    )
  }
};

const mapState = state => ({
  userType: state.user.type,
  email: state.user.email,
  selectedPet: state.pet.selectedPet,
  adoptionList: state.userPet.adoptionList,
  interestUserList: state.userPet.interestUserList
});

const mapDispatch = dispatch => ({
  addToInterest: () => dispatch(addInterest()),
  addToReject: () => dispatch(addReject()),
  updateSelectedPet: () => dispatch(selectRandomPet())
});

export default connect(mapState, mapDispatch)(UserHome);

UserHome.propTypes = {
  userType: PropTypes.string,
  email: PropTypes.string,
  selectedPet: PropTypes.object,
  adoptionList: PropTypes.array,
  interestUserList: PropTypes.array
};
