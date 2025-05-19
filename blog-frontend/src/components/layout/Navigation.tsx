import NavigationClient from "./NavigationClient";
export default function Navigation() {

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const adminItems = [{ href: "/admin/create-post", label: "Create Post" }];

  return <NavigationClient navItems={navItems} adminItems={adminItems} />;
}
