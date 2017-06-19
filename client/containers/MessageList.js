import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchInterestUsers, sendMessage } from '../redux/userPet';

// Component //

class MessageList extends React.Component{
  constructor(){
    super();
  }

  componentDidMount(){
    return this.props.updateInterestUserList();
  }

  render(){
    const adoptionList = this.props.adoptionList || [];
    return (
      <div>
        <table className="table table-striped">
            <tbody>
              {
                adoptionList.map((pet, idx) => {
                 return (
                  <tr key={pet.id}>
                    <td>
                      <div className="thumbnail list">
                        <img src={pet.image} />
                      </div>
                    </td>
                    <td>
                      <ul>
                      {
                        this.props.interestUserList[idx] && this.props.interestUserList[idx].map(el => (
                          <li key={el.userId+' ' + el.petId+''}>
                            { (
                              <div>
                                <span>{el.userName}: </span>
                                <form onSubmit={(e) => {this.props.handleSubmit(e, el.userId, el.petId)}} name='Message'>
                                  <div>
                                    <label htmlFor="message"><small>Message</small></label>
                                    <input name="message" type="text" />
                                  </div>
                                  <div>
                                    <button type="submit">Send!</button>
                                  </div>
                                </form>
                              </div>
                             )}
                          </li>
                        ))
                      }
                      </ul>
                    </td>
                  </tr>
                 )
                })
              }
            </tbody>
          </table>
      </div>
    )
  }
}

const mapState = state => ({
  adoptionList: state.userPet.adoptionList,
  interestUserList: state.userPet.interestUserList
});

const mapDispatch = dispatch => ({
  updateInterestUserList: () => dispatch(fetchInterestUsers()),
  handleSubmit (evt, userId, petId) {
    const message = evt.target.message.value;
    dispatch(sendMessage(message, userId, petId));
  }
});

export default connect(mapState, mapDispatch)(MessageList);

MessageList.propTypes = {
  adoptionList: PropTypes.array,
  interestUserList: PropTypes.array
};
