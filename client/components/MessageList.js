import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAdoptMessage } from '../redux/userPet';

// Component //

const InterestList = (props) => {
  const interestList = props.interestList || [];
  const messageList = props.messageList || [];
  const addMessage = props.addMessage;
  return (
    <div>
      <table className="table table-striped">
          <tbody>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
            {
              interestList.map(pet => {
               return (
                <tr key={pet.id}>
                  <td>
                    <div className="thumbnail list">
                      <img src={pet.image} />
                    </div>
                  </td>
                  <td className="center">
                    <ul>
                      <li>name: {pet.name}</li>
                      <li>age: {pet.age}</li>
                      <li>breed: {pet.breed}</li>
                      <li>description: {pet.description}</li>
                    </ul>
                  </td>
                  <td>{
                    messageList.map(el => el.petId).includes(pet.id) ?
                      <div className="glyphicon larger glyphicon-heart larger" style={{color: 'green'}} /> :
                      <a className="btn btn-success" onClick={() => addMessage(pet.id)}>
                        Message {pet.name}!
                      </a>
                  }</td>
                </tr>
               )
              })
            }
          </tbody>
        </table>
    </div>
  )
}


const mapState = state => ({
  interestList: state.userPet.interestList,
  messageList: state.userPet.messageList
});

const mapDispatch = dispatch => ({
  addMessage: petId => dispatch(addBasicMessage(petId))
});

export default connect(mapState, mapDispatch)(InterestList);

InterestList.propTypes = {
  interestList: PropTypes.array
};
