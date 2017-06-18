import React from 'react';

// Component //

const PetSwipe = (props) => {
  const defaultImage = 'https://i.ytimg.com/vi/2fb-g_V-UT4/hqdefault.jpg';
  return (
    <div>
      <div className="row" >
        <div className="col-sm-1"></div>
        <div className="col-sm-10 thumbnail">
          <img src={ props.selectedPet && props.selectedPet.image ? props.selectedPet.image : defaultImage } />
        </div>
        <div className="col-sm-1"></div>
      </div>
      <div className="row">
        <div className="col-sm-2" >
          <div className="glyphicon glyphicon-arrow-left" onClick={ props.selectedPet && props.selectedPet.image ? props.addToReject : null } />
        </div>
        <div className="col-sm-8 text-center" >
          <h1>{ props.selectedPet && props.selectedPet.image ? props.selectedPet.name : 'No New Pets!'}</h1>
        </div>
        <div className="col-sm-2" >
          <div className="glyphicon glyphicon-arrow-right" onClick={ props.selectedPet && props.selectedPet.image ? props.addToInterest : null }/>
        </div>
      </div>
    </div>
  )
}

export default PetSwipe;
