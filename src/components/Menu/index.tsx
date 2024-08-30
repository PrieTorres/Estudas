import { MenuLinkProps } from "../MenuLink";
import { NavLinks } from "../NavLinks";
import { Container } from "./Styles";
import { SafeImage } from "../SafeImage";

export const Menu = () => {
  const menuTabs: MenuLinkProps[] = [
    {//safe image
      children: "courses",
      link: "/courses",
    },
    {
      children: "home",
      link: "/",
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
