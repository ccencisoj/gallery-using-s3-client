import React from 'react';
import store from 'store';
import { Provider } from 'react-redux';
import { AppProvider } from 'hooks/AppContext';
import ProgressBar from 'components/ProgressBar';
import { ModalsProvider } from 'hooks/ModalsContext';
import { StorageProvider } from 'hooks/StorageContext';
import { ResponsiveProvider } from 'hooks/ResponsiveContext';

import "utils/disabledErrors";
import "../../public/scss/styles.scss";
import "../../public/scss/variables.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { Component, pageProps } = this.props;

    return (
      <Provider store={store}> 
        <AppProvider>
          <ResponsiveProvider>
            <ModalsProvider>
              <StorageProvider>
                <ProgressBar/>
                <Component {...pageProps}/>
              </StorageProvider>
            </ModalsProvider>
          </ResponsiveProvider>
        </AppProvider>
      </Provider>
    )
  }
}

export default App;