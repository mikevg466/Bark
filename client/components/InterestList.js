import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Component //

const InterestList = (props) => {
  const interestList = props.interestList || [];
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
                <tr key={pet.image}>
                  <td>
                    <div className="thumbnail list">
                      <img src={pet.image} />
                    </div>
                  </td>
                  <td></td>
                  <td>{
                    <a className="btn btn-success">
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
  interestList: state.userPet.interestList
});

const mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(InterestList);

InterestList.propTypes = {
  interestList: PropTypes.array
};
