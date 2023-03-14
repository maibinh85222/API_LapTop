import { BsGithub, BsTwitter, BsLinkedin } from "react-icons/bs";

const FooterLink = {
  categoryLinks: [
    {
      id: 1,
      linkName: "Laptop mới",
      url: "#",
    },
    { id: 2, linkName: "Phụ kiện", url: "#" },
    { id: 3, linkName: "Linh kiện", url: "#" },
  ],

  accountLinks: [
    {
      linkName: "Tài khoản của tôi",
      url: "/profile",
    },
    {
      linkName: "Yêu thích",
      url: "/wishlist",
    },
    {
      linkName: "Giỏ hàng",
      url: "/cart",
    },
  ],

  helpLinks: [
    {
      linkName: "Hoàn trả & hoàn tiền",
      url: "#",
    },
    {
      linkName: "FAQ",
      url: "#",
    },
    {
      linkName: "Liện hệ",
      url: "#",
    },
    {
      linkName: "Chính sách",
      url: "#",
    },
  ],

  socialLinks: [
    {
      linkName: <BsGithub />,
      url: "https://github.com/alux2001",
    },
    {
      linkName: <BsTwitter />,
      url: "https://twitter.com/alux2001",
    },
  ],
};

export { FooterLink };
