import PortraitCard from "/components/Sitewide/PortraitCard/PortraitCard";
import PortraitCardV0 from "/components/Sitewide/PortraitCard/v0";
import PortraitCardV1 from "/components/Sitewide/PortraitCard/v1";
import PortraitCardV3 from "/components/Sitewide/PortraitCard/v3";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Components/Sitewide/PortraitCard",
  component: PortraitCard,
  tags: ["autodocs"],
  parameters: {
    design: [
      {
        type: "figma",
        name: "Desktop",
        url: "https://www.figma.com/file/tlQe2WirTOpYUmoRVmR441/TM-Site-Refresh-2023?type=design&node-id=0%3A1&t=0c8OcMJiXK8Q4c20-1",
      },
    ],
  },
};

export const v0 = {
  component: PortraitCardV0,
  args: {
    type: "v0",
    image: "url",
    category: "Heather",
    title: "Sunset Serenade Quarter Zip",
    price: "$139.95",
    swatches: ["brown", "gray", "gold"],
    cta: "Free Gift With Purchase",
    badge: "Bestseller",
    url: "http://www.travismathew.com/sample",
  },
};

export const v3 = {
  component: PortraitCardV3,
  args: {
    type: "v3",
    image: "url",
    title: "Shop Outerwear",
    url: "http://www.travismathew.com/sample",
  },
};