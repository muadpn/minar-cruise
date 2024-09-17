import {
  BookCheck,
  Handshake,
  Ship,
  Disc2,
  MicVocal,
  SmilePlus,
  WandSparkles,
  Laugh,
  CandlestickChart,
  ShieldIcon,
} from "lucide-react";
import { CONSTANTS } from "../data/assets";

export const landingData = {
  heading: "MINAR CRUISE",
  title: "Best Cruise in the Arabian Sea",
  description:
    "Minar Cruise is a private catamaran sea cruise in Kerala, India. Minar Tourist Boat Cochin & Traders is registered with the Indian Register of Shipping. Our fleet has been providing hospitality and professional services for 20 years. The luxurious air-conditioned hall can be used for a variety of events, including official meetings, parties, family functions, weddings, and engagements. Our intimate fleet can seat up to 150 passengers, and has all-suite and all-balcony ships with superior service ratios. We have permission to cruise up to 12 nautical miles and offer scheduled trips ranging from 2 to 4 hours, which can be customized according to your needs. Join us on your next journey to experience the scenic beauty of Kochi and the Arabian Sea.",
  video: CONSTANTS.HERO.LANDING_VIDEO_URL,
  image: {
    url: CONSTANTS.HERO.HERO_IMAGE_URL,
    alt: CONSTANTS.HERO.HERO_IMAGE_ALT,
  },
};

export const Exclusive = {
  mainHeading: "Exclusive",
  subHeading:
    "BRING BACK YOUR MEMORIES IN OUR EXCLUSIVE MINAR CRUISE PACKAGE. ENJOY YOUR LIFE.",
  desc: "Host unforgettable events on our exclusive cruises, perfect for get-togethers, birthday parties, weddings, corporate meetings, and pre-wedding celebrations. Enjoy stunning sunsets, entertainment, and top-notch service on the Arabian Sea",
  video1: {
    url: CONSTANTS.EXCLUSIVE.PACKAGE_VIDEO_URL,
  },
};

export const BookingData = {
  mainHeading: "Why Choose ",
  subHeading:
    "Be it a cool DJ party with your friends and colleagues or a laid-back family vacation, now you can enjoy in the open sea with Minar",
  bgImage: {
    url: `url("/assets/sea2.gif")`,
    alt: "Booking image background",
  },
  boatImage: {
    url: "/assets/minar.png",
    alt: "Booking image background",
  },
  features: [
    {
      icon: "/assets/minarchooseicon/ship.svg",
      iconClass: "",
      heading: "Professional and Certified",
      description:
        "Minar, the only privately owned catamaran class vessel in the country to get Indian Register of Shipping (IRS) registration.",
    },
    {
      icon: "/assets/minarchooseicon/calendar.svg",
      iconClass: "",
      heading: "Get Instant Tour Bookings",
      description:
        "Simplify your booking experience with our web-based online booking or contact directly in any of the phone number given.",
    },
    {
      icon: "/assets/minarchooseicon/empty-wallet-tick.svg",
      iconClass: "",
      heading: "Best Price Guarantee",
      description:
        "Simplify your booking experience with our web-based online booking or contact directly in any of the phone number given.",
    },
    {
      icon: "/assets/minarchooseicon/people.svg",
      iconClass: "",
      heading: "Best Price Guarantee",
      description:
        "Simplify your booking experience with our web-based online booking or contact directly in any of the phone number given.",
    },
    {
      icon: "/assets/minarchooseicon/shield-tick.svg",
      iconClass: "",
      heading: "Safe Controls",
      description:
        "Simplify your booking experience with our web-based online booking or contact directly in any of the phone number given.",
    },
  ],
};

export const star = {
  url: "/assets/Star.png",
};

export const facilities = {
  description: [
    {
      icon: "/assets/minarfeature/activity.svg",
      heading: "IRS Registered",
      description:
        "Kerala's first private cruise yacht registered under Indian Register of Shipping.",
    },
    {
      icon: "/assets/minarfeature/brush-square.svg",
      heading: "Custom Packages",
      description:
        "Tailored cruise experiences to match your specific needs and preferences.",
    },
    {
      icon: "/assets/minarfeature/lovely.svg",
      heading: "Wheelchair Accessible",
      description:
        "Easy access for guests with mobility needs for a comfortable journey.",
    },
    // {
    //   icon: ShieldIcon,
    //   heading: "Premium Sound System",
    //   description: "Enjoy high-quality audio with our top-tier sound system.",
    // },
    // {
    //   icon: ShieldIcon,
    //   heading: "A/C Lounge",
    //   description:
    //     "Relax in a private, air-conditioned lounge for added luxury.",
    // },
    // {
    //   icon: ShieldIcon,
    //   heading: "Entertainment & Dining",
    //   description:
    //     "Onboard entertainment paired with delicious food of your choice.",
    // },
    {
      icon: "/assets/minarfeature/messages-2.svg",
      heading: "Event Hosting",
      description:
        "Perfect for weddings, birthdays, corporate events, and celebrations.",
    },
    {
      icon: "/assets/minarfeature/cake.svg",
      heading: "Celebration",
      description:
        "A/c hall for marriage, wedding anniversary, birthday, corporate meetings",
    },
    {
      icon: "/assets/minarfeature/Meal.svg",
      heading: "Food",
      description: "Food counter facility",
    },
    {
      icon: "/assets/minarfeature/shield-tick.svg",
      heading: "Safety First",
      description:
        "Equipped with life-saving gear and firefighting equipment up to international standards.",
    },
    {
      icon: "/assets/minarfeature/people.svg",
      heading: "Crew",
      description: "Trained and professional crew for assistance",
    },
    // {
    //   icon: "/assets/minarfeature/messages-2.svg",
    //   heading: "Ideal",
    //   description: "Ideal for business meetings…",
    // },
  ],
};

export const entertainment = {
  image: {
    url: "/assets/nightPhoto.jpg",
    logo: "/assets/logo.png",
  },
  activities: [
    { description: "Live DJ performance", icon: Disc2 },
    { description: "Live Karaoke singers", icon: MicVocal },
    { description: "Mimicry show", icon: SmilePlus },
    { description: "Magic Show", icon: WandSparkles },
    { description: "Fun filled programs", icon: Laugh },
  ],
};

export const services = {
  heading: "Minar Cruise Events ",
  subHeading: "PLAN YOUR EXPERIENCE",

  bgVid: CONSTANTS.EVENTS.VIDEO_URL,

  description: [
    "Are you looking for an unforgettable and exciting experience for your special event or organization’s next corporate retreat?",
    "If you’re ready to explore all the exciting possibilities of charter cruising, contact us at:",
  ],
  contact: ["+91 8089021666", "+91 8089031666"],
  events: [
    {
      image: CONSTANTS.EVENTS.FAMILY_IMAGE_URL,
      alt: CONSTANTS.EVENTS.FAMILY_IMAGE_ALT,
      title: "Family Gathering",
      description:
        "Planning a family reunion? Minar Cochin Cruise offer a fun-filled vacation with your loved ones.",
    },
    {
      image: CONSTANTS.EVENTS.CELEBRATION_IMAGE_URL,
      alt: CONSTANTS.EVENTS.CELEBRATION_IMAGE_ALT,
      title: "Celebration Events",
      description:
        "Celebrate your Wedding, Anniversaries, Birthdays and other memorable events with the best celebration cruise.",
    },
    {
      image: CONSTANTS.EVENTS.CORPORATE_IMAGE_URL,
      alt: CONSTANTS.EVENTS.CORPORATE_IMAGE_ALT,
      title: "Corporate Events",
      description:
        "We have the perfect space for corporate meetings and your business needs on our luxury cruise.",
    },
  ],
};

export const galleryImageUrl = [
  { url: CONSTANTS.GALLERY.IMG_1_URL, alt: CONSTANTS.GALLERY.IMG_1_ALT },
  { url: CONSTANTS.GALLERY.IMG_2_URL, alt: CONSTANTS.GALLERY.IMG_2_ALT },
  { url: CONSTANTS.GALLERY.IMG_3_URL, alt: CONSTANTS.GALLERY.IMG_3_ALT },
  { url: CONSTANTS.GALLERY.IMG_4_URL, alt: CONSTANTS.GALLERY.IMG_4_ALT },
  { url: CONSTANTS.GALLERY.IMG_5_URL, alt: CONSTANTS.GALLERY.IMG_5_ALT },
  { url: CONSTANTS.GALLERY.IMG_6_URL, alt: CONSTANTS.GALLERY.IMG_6_ALT },
  { url: CONSTANTS.GALLERY.IMG_7_URL, alt: CONSTANTS.GALLERY.IMG_7_ALT },
  { url: CONSTANTS.GALLERY.IMG_8_URL, alt: CONSTANTS.GALLERY.IMG_8_ALT },
];

export const footer = {
  image:
    "https://cochincruiseline.com/wp-content/uploads/2021/08/logo-light.png",
  contact: ["+91 8089021666", "+91 8089061444"],
  email: "info@cochincruiseline.com",
  address:
    "GF, 40/6185, Swapnil Enclave, Highcourt junction, Marine Drive, Ernakulam, Kerala, India, 682031",
  socials: [
    {
      name: "Facebook",
      icon: "/assets/Social/facebook.svg",
      url: "https://www.facebook.com/minarcruisecochin/",
    },
    {
      name: "Instagram",
      icon: "/assets/Social/instagram.svg",
      url: "https://www.instagram.com/minarcruisecochin/",
    },
    {
      name: "Whatsapp",
      icon: "/assets/Social/whatsapp.svg",
      url: "https://api.whatsapp.com/send?phone=917034191993",
    },
  ],
};
