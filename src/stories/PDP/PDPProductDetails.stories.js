import PDPProductDetails from "/components/PDP/PDPProductDetails";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Components/PDP/Product Details",
  component: PDPProductDetails,
  tags: ["autodocs"],
};

// // More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    language: "en-us",
    productSizing: [
      { name: "XS", count: 1 },
      { name: "S", count: 1 },
      { name: "M", count: 1 },
      { name: "L", count: 1 },
      { name: "XL", count: 1 },
    ],
    title: "CLOUD LONG SLEEVE HENLEY TEE",
    price: 99.95,
    description:
      "Add a truly versatile style to your weekly staples. The WOMEN’S CLOUD HENLEY LONG SLEEVE is crafted from our “Cloud Tee” fabric delivering soft lightweight comfort whether you’ve paired it with joggers for morning errands or with jeans for a look worthy of a night out.",
  },
  parameters: {
    design: [
      {
        type: "figma",
        name: "Mobile",
        url: "https://www.figma.com/file/tlQe2WirTOpYUmoRVmR441/TM-Site-Refresh-2023?type=design&node-id=1%3A19971&t=IOdtfClI40VIAsNr-1",
      },
      {
        type: "figma",
        name: "Desktop",
        url: "https://www.figma.com/file/tlQe2WirTOpYUmoRVmR441/TM-Site-Refresh-2023?type=design&node-id=1%3A22784&t=IOdtfClI40VIAsNr-1",
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-full lg:w-1/3 lg:pl-2.5 md:w-full">
        <Story />
      </div>
    ),
  ],
};