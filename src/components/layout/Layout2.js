import React from 'react';
import * as Icon from 'react-feather';
import { useRouter } from 'next/router';
import styles from './Layout2.module.scss';
import Button from 'components/button/Button';
import { useResponsive } from 'hooks/ResponsiveContext';

class Layout2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    let { children, responsive, router } = this.props;
    let { isMobile } = responsive;

    return (
      <div className={styles.layout}>
        <div className={styles.navigation}>
          <Button 
            icon={Icon.ChevronLeft} 
            onClick={()=> router.back()}/>
        </div>
        <div className={styles.main}>
          {!(isMobile) &&
          <><img className={styles.figure1} 
          src="image/green_figure1.svg"/>
          <img className={styles.figure2} 
          src="image/green_figure2.svg"/></>}
          {children}
        </div>
      </div>
    )
  }
}

export default function(props) {
  const responsive = useResponsive();
  const router = useRouter();

  return <Layout2 {...props}
    responsive={responsive}
    router={router}/>
}