// src/components/Layout/Header.tsx
import React from "react";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  LogoText,
  Navigation,
  NavLink,
} from "./styles";

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <LogoText>MarketSense</LogoText>
        </Logo>

        <Navigation>
          <NavLink href="/" active={router.pathname === "/"}>
            Dashboard
          </NavLink>
          <NavLink href="/news" active={router.pathname === "/news"}>
            News
          </NavLink>
          <NavLink href="/markets" active={router.pathname === "/markets"}>
            Markets
          </NavLink>
          <NavLink href="/stocks" active={router.pathname === "/stocks"}>
            Stocks
          </NavLink>
          <NavLink href="/about" active={router.pathname === "/about"}>
            About
          </NavLink>
          <ThemeToggle />
        </Navigation>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
