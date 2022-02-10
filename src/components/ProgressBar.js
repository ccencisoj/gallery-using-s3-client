import React from 'react';
import NextProgressBar from 'nextjs-progressbar';
import { PRIMARY_COLOR } from 'constants/colors';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    return <NextProgressBar height={5} 
      color={PRIMARY_COLOR} 
      options={{ showSpinner: false }}/>
  }
}

export default ProgressBar;