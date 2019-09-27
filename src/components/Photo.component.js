import React from 'react';

function Photo (props){
  return (
    //exact the url from props and render an image
    <li>
      <img src={props.url} alt='' />
    </li>
  );
};

export default Photo;
