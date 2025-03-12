// src/components/Layout/styles.ts
import styled from "styled-components";
import theme from "@/styles/theme";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${theme.colors.background};
`;

export const MainContent = styled.main`
  flex: 1;
  padding: ${theme.space[4]};
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.space[6]};
  }
`;

export const HeaderContainer = styled.header`
  background-color: ${theme.colors.dark};
  box-shadow: ${theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid ${theme.colors.border};
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.space[4]};
  max-width: 1600px;
  margin: 0 auto;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.space[4]} ${theme.space[6]};
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoText = styled.h1`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.primary};
  margin: 0;
  letter-spacing: 0.5px;
`;

export const Navigation = styled.nav`
  display: none;

  @media (min-width: ${theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    gap: ${theme.space[6]};
  }
`;

interface NavLinkProps {
  active?: boolean;
}

export const NavLink = styled.a<NavLinkProps>`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeights.medium};
  color: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.text.secondary};
  text-decoration: none;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
    text-decoration: none;
  }

  ${(props) =>
    props.active &&
    `
    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${theme.colors.primary};
    }
  `}
`;

export const FooterContainer = styled.footer`
  background-color: ${theme.colors.dark};
  padding: ${theme.space[6]};
  margin-top: ${theme.space[8]};
  border-top: 1px solid ${theme.colors.border};
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1600px;
  margin: 0 auto;
  text-align: center;
  gap: ${theme.space[3]};

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

export const FooterText = styled.p`
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

export const FooterLink = styled.a`
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  margin: 0 ${theme.space[2]};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
    text-decoration: underline;
  }
`;
