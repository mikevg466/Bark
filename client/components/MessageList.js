import React from 'react';
import PropTypes from 'prop-types';

// Component //

const MessageList = (props) => {
  const adoptionList = props.adoptionList || [];
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
              adoptionList.map(pet => {
               return (
                <tr key={pet.id}>
                  <td>
                    <div className="thumbnail list">
                      <img src={pet.image} />
                    </div>
                  </td>
                  <td>
                  </td>
                  <td>{
                    <ul>
                      <li>USERNAME_HERE: {'MESSAGE FORM HERE'}</li>
                    </ul>
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

export default MessageList;
