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
import Dashboard from './routes/Dashboard/Dashboard';
import PageNotFound from './errorPages/PageNotFound/PageNotFound';

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

function App(): JSX.Element {
  return (
    <ThemeProvider theme={mainTheme}>
      <StyledLayout>
        <GlobalStyles />
        <Nav pathname={window.location.pathname} />
        <MainContent>
          <Router>
            <Home path="/" />
            <Login path="/login" />
            <Signup path="/signup" />
            <Dashboard path="/dashboard/*" />
            <PageNotFound default />
          </Router>
        </MainContent>
        <Footer />
      </StyledLayout>
    </ThemeProvider>
  );
}

export default App;
