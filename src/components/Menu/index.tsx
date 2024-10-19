import { MenuLinkProps } from "../MenuLink";
import { NavLinks } from "../NavLinks";
import { Container } from "./Styles";

export const Menu = () => {
  const menuTabs: MenuLinkProps[] = [
    {
      children: "home",
      link: "/",
    },
    {
      children: "courses",
      link: "/courses",
    },
    {
      children: "about",
      link: "/about",
    },
  ];

  return (
    <Container>
      <NavLinks links={menuTabs} />
    </Container>
  )
}
