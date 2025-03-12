import React from "react";
import {
  FooterContainer,
  FooterContent,
  FooterText,
  FooterLink,
} from "./styles";

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          &copy; {new Date().getFullYear()} MarketSense - News-Driven Market
          Analysis
        </FooterText>
        <div>
          <FooterLink href="/terms">Terms</FooterLink>
          <FooterLink href="/privacy">Privacy</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </div>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
