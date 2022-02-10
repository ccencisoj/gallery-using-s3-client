import React from 'react';
import { connect } from 'react-redux';
import styles from './Navigation1.module.scss';
import NavigationActions1 from 'components/navigationActions/NavigationActions1';
import NavigationActions2 from 'components/navigationActions/NavigationActions2';

const mapStateToProps = (store)=> ({
  currentUser: store.common.currentUser
});

class Navigation1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    let { currentUser } = this.props;

    return (
      <div className={styles.navigation}>
        <div className={styles.container}>
          <div className={styles.left}>
            <p className={styles.logo}>MyGallery</p>
          </div>
          <div className={styles.right}>
            {!(currentUser) ? 
              <NavigationActions1/> : 
              <NavigationActions2/>}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps, 
  null
)(Navigation1);