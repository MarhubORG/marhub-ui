import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaLinkedin } from 'react-icons/fa';

const StyledFooter = styled.footer`
  display: flex;
  background-color: ${({ theme }): string => theme.white};
  height: 1.3rem;
  padding: 2rem 1.2rem;
`;

const MarhubLink = styled.a`
  margin-left: 0.2rem;
  color: ${({ theme }): string => theme.primaryColor};
  text-decoration: none;
  font-weight: 600;
`;

const SocialLinksSection = styled.section`
  margin-left: auto;
`;

const FacebookLink = styled(FaFacebookF)`
  height: 1.55rem;
  width: 1.55rem;
  color: ${({ theme }): string => theme.socialLinkGray};
  &:hover {
    color: ${({ theme }): string => theme.darkGray};
  }
`;

const TwitterLink = styled(FaTwitter)`
  height: 1.55rem;
  width: 1.55rem;
  color: ${({ theme }): string => theme.socialLinkGray};
  &:hover {
    color: ${({ theme }): string => theme.darkGray};
  }
`;

const LinkedInLink = styled(FaLinkedin)`
  height: 1.55rem;
  width: 1.55rem;
  color: ${({ theme }): string => theme.socialLinkGray};
  &:hover {
    color: ${({ theme }): string => theme.darkGray};
  }
  padding-left: 0.2rem;
`;

const SocialLink = styled.a`
  padding-left: 0.7rem;
`;

export default function Footer(): JSX.Element {
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
        <SocialLink
          href="https://www.facebook.com/marhub.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookLink />
        </SocialLink>
        <SocialLink
          href="https://twitter.com/marhub_co"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterLink />
        </SocialLink>
        <SocialLink
          href="https://www.linkedin.com/company/marhubco/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInLink />
        </SocialLink>
      </SocialLinksSection>
    </StyledFooter>
  );
}
