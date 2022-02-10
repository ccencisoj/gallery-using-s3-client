import React from 'react';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      items: this.props.items(this.turnToggle)
    };
  }

  turnToggle = ()=> {
    this.setState(({ items, currentIndex })=> {
      return {currentIndex: 
        (currentIndex + 1) < items.length ? 
        currentIndex + 1 : 0};
    });
  }

  render = ()=> {
    let { items, currentIndex } = this.state;

    return items[currentIndex];
  }
}

export default Toggle;