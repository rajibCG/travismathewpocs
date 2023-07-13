import PDPProductImages from "/components/PDP/PDPProductImages";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Components/PDP/Product Images",
  component: PDPProductImages,
  tags: ["autodocs"],
};

export const Default = {
  args: {
    thumbImage:
      "https://www.travismathew.com/medias/sys_master/images/images/hba/hde/9198440808478/4MT111-9HDG.jpg",
    title: "The Daily Knit Shoe",
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
      <div className="flex flex-col w-full md:w-2/3 gap-4 pdp-product-images">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/2 md:pr-2.5 mb-2.5 md:mb-0">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};