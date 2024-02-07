import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

// NAVIGATION
export const NAV_LINKS = [
  { id: 1, url: "/", key: "home", label: 'Home', icon: HomeIcon},
  { id: 2, url: "/books", key: "Books", label: "Books" ,  icon: MenuBookIcon},
  { id: 3, url: "/cart", key: "Cart", label: "Cart" ,  icon: ShoppingCartIcon},
  { id: 5, url: "/contact", key: "Contact_us", label: "Help ?" ,  icon: HelpCenterIcon},
];

// HERO SECTION
export const SLIDE_IMAGES = [
  {
    id: 0,
    img: "/book2.jpg",
  },
  {
    id: 1,
    img: "/book4.jpg",
  },
  {
    id: 2,
    img: "/book5.jpg",
  },
  {
    id: 3,
    img: "/book6.png",
  },
];

// FOOTER SECTION
export const FOOTER_LINKS = [
  {
    id: 1,
    title: "Learn More",
    listItems: [
      { id: 1, label: "Visit Our HomePage", url: "/" },
      { id: 2, label: "Latest Releases", url: "/books" },
      { id: 3, label: "Contact Us", url: "/contact" },
    ],
  },
  {
    id: 2,
    title: "Our Community",
    listItems: [
      { id: 1, label: "E-Book workshop", url: "/" },
      { id: 2, label: "Reading workshop", url: "/" },
      { id: 3, label: "Drawing workshop", url: "/" },
    ],
  },
];

export const FOOTER_CONTACT_INFO = {
  id: 1,
  title: "Contact Us",
  listItems: [
    { id: 1, label: "Admin Officer", value: "046-546-1269" },
    { id: 2, label: "Email Officer", value: "trhien541@gmail.com" },
  ],
};

export const SOCIALS = {
  id: 1,
  title: "Social",
  listItems: [
    {
      id: 1,
      title: "Facebook",
      icon: FacebookIcon,
      url: "/",
    },
    {
      id: 2,
      title: "Instagram",
      icon: InstagramIcon,
      url: "/",
    },
    {
      id: 3,
      title: "Youtube",
      icon: YouTubeIcon,
      url: "/",
    },
  ],
};
