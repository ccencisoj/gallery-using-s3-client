import React from 'react';

const ModalsContext = React.createContext({});

const ModalsProvider = (props)=> {
  const { children } = props;
  const [modals, setModals] = React.useState({});

  const show = (Modal, props, _modalId)=> {
    const modalId = _modalId || Date.now();

    const WrappedModal = ()=> {
      const [willHiddenModal, setWillHiddenModal] = React.useState(false);

      const hideModal = (timeout)=> {
        setWillHiddenModal(true);

        setTimeout(()=> {
          delete modals[modalId];
          setModals({...modals});
        }, timeout);
      } 

      return <Modal
        {...props}
        willHiddenModal={willHiddenModal} 
        hideModal={hideModal}/>
    }

    modals[modalId] = <WrappedModal key={modalId}/>;
    setModals({...modals});
  }

  return (
    <ModalsContext.Provider 
      value={{ show }}>
      {children}
      {Object.values(modals)}
    </ModalsContext.Provider>
  )
}

const useModals = ()=> {
  return React.useContext(ModalsContext);
}

export { ModalsProvider, useModals };