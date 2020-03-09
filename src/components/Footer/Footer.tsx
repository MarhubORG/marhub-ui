import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaLinkedin } from 'react-icons/fa';

const StyledFooter = styled.footer`
  display: flex;
  background-color: white;
  height: 1.3rem;
  padding: 2rem 1.2rem;
`;

const MarhubLink = styled.a`
  margin-left: 0.2rem;
  color: ${props => props.theme.primaryColor};
  text-decoration: none;
  font-weight: 600;
`;

const SocialLinksSection = styled.section`
  margin-left: auto;
`;

const FacebookLink = styled(FaFacebookF)`
  height: 1.55rem;
  width: 1.55rem;
  color: ${props => props.theme.socialLinkGray};
`;

const TwitterLink = styled(FaTwitter)`
  height: 1.55rem;
  width: 1.55rem;
  color: ${props => props.theme.socialLinkGray};
`;

const LinkedInLink = styled(FaLinkedin)`
  height: 1.55rem;
  width: 1.55rem;
  color: ${props => props.theme.socialLinkGray};
  padding-left: 0.2rem;
`;

const SocialLink = styled.a`
  padding-left: 0.7rem;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <span>Powered by </span>
      <MarhubLink
        href="https://www.marhubinternational.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Marhub
      </MarhubLink>
      <SocialLinksSection>
        <SocialLink>
          <FacebookLink />
        </SocialLink>
        <SocialLink>
          <TwitterLink />
        </SocialLink>
        <SocialLink>
          <LinkedInLink />
        </SocialLink>
      </SocialLinksSection>
    </StyledFooter>
  );
}
