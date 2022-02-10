import React from 'react';
import Button from 'components/button/Button';
import styles from './MoreButton.module.scss';
import OutsideClickHandler from 'react-outside-click-handler';

class MoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelectable: false
    };
  }

  toggleSelectable = ()=> {
    this.setState(({ showSelectable })=> {
      return { showSelectable: 
        showSelectable ? false : true};
    });
  }
  
  hideSelectable = (timeout)=> {
    setTimeout(() => {
      this.setState({showSelectable: false});
    }, timeout || 0);
  }

  render = ()=> {
    let { icon: Icon, children, ...butonProps} = this.props;
    let { showSelectable } = this.state;
    let Selectable = children({hideSelectable: this.hideSelectable});

    return (
      <OutsideClickHandler onOutsideClick={this.hideSelectable}>
        <div className={styles.more_button}>
          <Button 
            {...butonProps}
            icon={Icon} 
            onClick={this.toggleSelectable}/>
          {showSelectable && Selectable}
        </div>
      </OutsideClickHandler>
    )
  }
}

export default MoreButton;