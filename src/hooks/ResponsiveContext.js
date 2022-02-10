import React from 'react';

const ResponsiveContext = React.createContext({});

const ResponsiveProvider = ({ children })=> {
  const [ isDesktop, setIsDesktop ] = React.useState(false);
  const [ isTablet, setIsTablet ] = React.useState(false);
  const [ isMobile, setIsMobile ] = React.useState(true);

  const updateWindowType = ()=> {
    setIsDesktop((window.innerWidth > 1040) ? true : false);
    setIsTablet((window.innerWidth > 640 && window.innerWidth <= 1040) ? true : false);
    setIsMobile((window.innerWidth > 0 && window.innerWidth <= 640 ? true : false));
  }

  React.useEffect(()=> {
    updateWindowType();
    window.addEventListener("resize", updateWindowType);
    return ()=> window.addEventListener("resize", updateWindowType);
  }, []);

  return (
    <ResponsiveContext.Provider 
      value={{ isDesktop, isTablet, isMobile }}>
      {children}
    </ResponsiveContext.Provider>
  )
}

const useResponsive = ()=> {
  return React.useContext(ResponsiveContext);
}

export { ResponsiveProvider, useResponsive };