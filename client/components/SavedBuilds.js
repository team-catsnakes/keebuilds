import React from 'react';
import '../scss/styles.scss';

const SavedBuilds = ({builds}) => {
  console.log({builds});
  console.log('typeof builds is', typeof builds);

  const handleGet = () => {
    // redirect to saved builds page
  };
  const cards = [];
  for(const build of builds){
    cards.push(
      <div>
      Name: {build.name},
      PCB: {build.pcb}
      </div>
    );
  }
  console.log('SavedBuilds is rendering');
  return (
    <div className="savedBuilds">
      {cards}
    </div>
  );
};

export default SavedBuilds;
