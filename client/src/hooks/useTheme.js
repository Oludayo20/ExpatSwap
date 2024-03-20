import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({
  darkTheme: false,
  setDarkTheme: () => {}
});

const UseTheme = ({ children }) => {
  const themeFromStorage =
    typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem('Expat-Swap')) ?? false
      : false;

  const [darkTheme, setDarkTheme] = useState(themeFromStorage);

  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    setRenderComponent(true);
  }, []);

  if (!renderComponent) return <></>;

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? 'dark' : ''} min-h-screen`}>
        <div className="dark:text-white dark:bg-dark text-dark">{children}</div>
      </div>
    </ThemeContext.Provider>
  );
};

export default UseTheme;
