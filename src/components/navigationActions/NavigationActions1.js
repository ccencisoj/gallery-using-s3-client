import React from 'react';
import * as Icon from 'react-feather';
import { useRouter } from 'next/router';
import Button from 'components/button/Button';
import styles from './NavigationActions1.module.scss';
import { useResponsive } from 'hooks/ResponsiveContext';

class NavigationActions1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    }
  }

  showMenu = ()=> {
    this.setState({showMenu: true});
  }

  hideMenu = ()=> {
    this.setState({showMenu: false});
  }

  render = ()=> {
    let { responsive, router } = this.props;
    let { showMenu } = this.state;
    let { isDesktop } = responsive;

    return (
      <div className={styles.navigation_actions}>
        {isDesktop && <>
          <Button 
            secundary={true} 
            label="Registrarme"
            onClick={()=> router.push("/signUp")}/>
          <Button 
            primary={true} 
            label="Iniciar sesion"
            onClick={()=> router.push("/signIn")}/></>}
        {!isDesktop && <>
          <Button 
            icon={Icon.Menu}
            onClick={this.showMenu}/></>}
        {showMenu &&
        <div className={styles.menu}>
          <div className={styles.header}>
            <p className={styles.title}>
              Menu
            </p>
            <Button
              icon={Icon.X}
              onClick={this.hideMenu}/>
          </div>
          <div className={styles.main}>
            <Button 
              flex={true}
              secundary={true} 
              label="Registrarme"
              onClick={()=> router.push("/signUp")}/>
            <Button 
              flex={true}
              primary={true} 
              label="Iniciar sesion"
              onClick={()=> router.push("/signIn")}/>
          </div>
        </div>}
      </div>
    )
  }
}

export default function(props) {
  const responsive = useResponsive();
  const router = useRouter();

  return (
    <NavigationActions1 {...props} 
      responsive={responsive}
      router={router}/>
  )
}