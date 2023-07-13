import FullWidthBanner from "/components/Sitewide/FullWidthBanner/FullWidthBanner";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Components/Sitewide/Full Width Banner",
  component: FullWidthBanner,
  tags: ["autodocs"],
  parameters: {
    design: [
      {
        type: "figma",
        name: "Mobile",
        url: "https://www.figma.com/file/tlQe2WirTOpYUmoRVmR441/TM-Site-Refresh-2023?type=design&node-id=1%3A10521&t=IOdtfClI40VIAsNr-1",
      },
      {
        type: "figma",
        name: "Desktop",
        url: "https://www.figma.com/file/tlQe2WirTOpYUmoRVmR441/TM-Site-Refresh-2023?type=design&node-id=1%3A2891&t=IOdtfClI40VIAsNr-1",
      },
    ],
  },
};

// // More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    background_image:
      "https://www.travismathew.com/medias/sys_master/root/h94/h63/9254497288222/W1845-SS23-SHORTCAMPAIGN-FULL-BANNER-DESKTOP-LORES-2500x1063.jpg?im=Resize,width=2500",
    background_image_mobile:
      "https://www.travismathew.com/medias/sys_master/root/ha5/hdf/9254497353758/W1845-SS23-PEREFCTSHOE-FULL-BANNER-LORES-1242x1242.jpg?im=Resize,width=700",
    headline: "[US] Every season is short season",
    sub_headline:
      "From total comfort to quick-drying performance, TravisMathew shorts supply everything you need.",
    cta_button: {
      title: "Shop all shorts",
      href: "/men",
    },
  },
};