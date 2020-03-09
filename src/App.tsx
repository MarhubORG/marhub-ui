import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Nav from './components/Nav/nav';
import Footer from './components/Footer/Footer';
import GlobalStyles from './styles/globalStyles';
import { mainTheme } from './styles/themes';

const StyledLayout = styled.div`
  display: flex;
  min-height: 100vh;
  max-height: 100vh;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: scroll;
`;

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <StyledLayout>
        <GlobalStyles />
        <Nav />
        <MainContent />
        <Footer />
      </StyledLayout>
    </ThemeProvider>
  );
}

export default App;
