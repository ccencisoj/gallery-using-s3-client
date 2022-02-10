import React from 'react';
import * as Icon from 'react-feather';
import { useRouter } from 'next/router';
import Button from 'components/button/Button';
import MoreButton from 'components/MoreButton';
import { createObjectURL } from 'react-object-url';
import { useStorage } from 'hooks/StorageContext';
import styles from './NavigationActions2.module.scss';
import { useResponsive } from 'hooks/ResponsiveContext';
import SelectableNotifications from 'components/selectable/SelectableNotifications';

class NavigationActions2 extends React.Component {
  constructor(props) {
    super(props);
  }

  uploadImages = ()=> {
    this.props.storage.loadImages((images)=> {
      images.forEach((image)=> {
        this.props.addPost({
        image: createObjectURL(image)});
      })
    })
  }

  render = ()=> {
    let { responsive, storage, router } = this.props;
    let { isDesktop } = responsive;

    return (
      <div className={styles.navigation_actions}>
        <Button icon={Icon.Home} onClick={()=> router.push("/")}/>
        <MoreButton icon={Icon.Bell}>
          {({hideSelectable})=> 
          <SelectableNotifications 
            hideSelectable={hideSelectable}/>}
        </MoreButton>
        <Button icon={Icon.User} 
          onClick={()=> router.push("/profile")}/>
        {isDesktop && <Button 
          primary={true} label="Subir imagenes"
          onClick={()=> storage.uploadImages()}/>}
      </div>
    )
  }
}

export default function(props) {
  const responsive = useResponsive();
  const router = useRouter();
  const storage = useStorage();

  return <NavigationActions2 {...props} 
    responsive={responsive}
    router={router}
    storage={storage}/>
}