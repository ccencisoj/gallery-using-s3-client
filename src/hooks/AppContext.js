import React from 'react';
import agent from 'agent';
import { connect } from 'react-redux';
import { SET_CURRENT_USER } from 'constants/actionTypes';

const AppContext = React.createContext({});

const mapActionsToProps = (dispatch)=> ({
  setCurrentUser: (user)=> dispatch({
    type: SET_CURRENT_USER,
    payload: user
  })
})

const AppProvider = (props)=> {
  const { children } = props;

  React.useEffect(()=> {
    agent.Auth.current().then(({user})=> {
      props.setCurrentUser(user);
    })
  }, [children]);

  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  )
}

const useApp = ()=> {
  return React.useContext(AppContext);
}
const connectedAppProvider = connect(
  null, mapActionsToProps)(AppProvider);

export { connectedAppProvider as AppProvider, useApp }