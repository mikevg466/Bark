import React from 'react';

// Component //

const PetSwipe = (props) => {
  return (
    <div>
      <img src={props.selectedPet && props.selectedPet.image} />
    </div>
  )
}

export default PetSwipe;
