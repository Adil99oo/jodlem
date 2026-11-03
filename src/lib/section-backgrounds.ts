import contactDesktop from "@/assets/bg/contact.webp";
import contactDesktopJpg from "@/assets/bg/contact.jpg";
import contactMobile from "@/assets/bg/contact-mobile.webp";
import contactMobileJpg from "@/assets/bg/contact-mobile.jpg";
import packagesDesktop from "@/assets/bg/packages.webp";
import packagesDesktopJpg from "@/assets/bg/packages.jpg";
import packagesMobile from "@/assets/bg/packages-mobile.webp";
import packagesMobileJpg from "@/assets/bg/packages-mobile.jpg";
import shopDesktop from "@/assets/bg/shop.webp";
import shopDesktopJpg from "@/assets/bg/shop.jpg";
import shopMobile from "@/assets/bg/shop-mobile.webp";
import shopMobileJpg from "@/assets/bg/shop-mobile.jpg";
import testimonialsDesktop from "@/assets/bg/testimonials.webp";
import testimonialsDesktopJpg from "@/assets/bg/testimonials.jpg";
import testimonialsMobile from "@/assets/bg/testimonials-mobile.webp";
import testimonialsMobileJpg from "@/assets/bg/testimonials-mobile.jpg";
import whyDesktop from "@/assets/bg/why.webp";
import whyDesktopJpg from "@/assets/bg/why.jpg";
import whyMobile from "@/assets/bg/why-mobile.webp";
import whyMobileJpg from "@/assets/bg/why-mobile.jpg";

export type SectionBackgroundSources = {
  desktopWebp: string;
  desktopJpg: string;
  mobileWebp: string;
  mobileJpg: string;
  position?: string;
};

export const sectionBackgrounds = {
  packages: {
    desktopWebp: packagesDesktop,
    desktopJpg: packagesDesktopJpg,
    mobileWebp: packagesMobile,
    mobileJpg: packagesMobileJpg,
    position: "center 35%",
  },
  shop: {
    desktopWebp: shopDesktop,
    desktopJpg: shopDesktopJpg,
    mobileWebp: shopMobile,
    mobileJpg: shopMobileJpg,
    position: "center 22%",
  },
  why: {
    desktopWebp: whyDesktop,
    desktopJpg: whyDesktopJpg,
    mobileWebp: whyMobile,
    mobileJpg: whyMobileJpg,
    position: "center center",
  },
  testimonials: {
    desktopWebp: testimonialsDesktop,
    desktopJpg: testimonialsDesktopJpg,
    mobileWebp: testimonialsMobile,
    mobileJpg: testimonialsMobileJpg,
    position: "center 42%",
  },
  contact: {
    desktopWebp: contactDesktop,
    desktopJpg: contactDesktopJpg,
    mobileWebp: contactMobile,
    mobileJpg: contactMobileJpg,
    position: "center center",
  },
} satisfies Record<string, SectionBackgroundSources>;
