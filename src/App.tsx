import React from 'react';
import styled from 'styled-components';
import Nav from './components/Nav/nav';
import Footer from './components/Footer/Footer';

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
    <StyledLayout>
      <Nav />
      <MainContent />
      <Footer />
    </StyledLayout>
  );
}

export default App;
