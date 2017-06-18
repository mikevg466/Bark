import React from 'react';

// Component //

const PetSwipe = (props) => {
  return (
    <div>
      <div className="row" >
        <div className="col-sm-1"></div>
        <div className="col-sm-10">
          <img src={props.selectedPet && props.selectedPet.image} />
        </div>
        <div className="col-sm-1"></div>
      </div>
      <div className="row">
        <div className="col-sm-2" >
          <div className="glyphicon glyphicon-arrow-left" onClick={ props.addToReject } />
        </div>
        <div className="col-sm-8 text-center" >
          <h1>{props.selectedPet && props.selectedPet.name}</h1>
        </div>
        <div className="col-sm-2" >
          <div className="glyphicon glyphicon-arrow-right" onClick={ props.addToInterest }/>
        </div>
      </div>
    </div>
  )
}

export default PetSwipe;
