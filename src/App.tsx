import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Router } from '@reach/router';
import Nav from './components/Nav/nav';
import Footer from './components/Footer/Footer';
import GlobalStyles from './styles/globalStyles';
import { mainTheme } from './styles/themes';
import Home from './routes/Home/Home';
import Login from './routes/Registration/Login/Login';
import Signup from './routes/Registration/Signup/Signup';

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
        <MainContent>
          <Router>
            <Home path="/" />
            <Login path="/login" />
            <Signup path="/signup" />
          </Router>
        </MainContent>
        <Footer />
      </StyledLayout>
    </ThemeProvider>
  );
}

export default App;
