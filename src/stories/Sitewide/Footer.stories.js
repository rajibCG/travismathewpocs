import Footer from "/components/Sitewide/Footer/Footer";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Components/Sitewide/Footer",
  component: Footer,
  tags: ["autodocs"],
  argTypes: {
    lang: "en-US",
  },
  parameters: {
    design: [
      {
        type: "figma",
        name: "Mobile",
        url: "https://www.figma.com/file/tlQe2WirTOpYUmoRVmR441/TM-Site-Refresh-2023?type=design&node-id=1%3A26463&t=IOdtfClI40VIAsNr-1",
      },
      {
        type: "figma",
        name: "Desktop",
        url: "https://www.figma.com/file/tlQe2WirTOpYUmoRVmR441/TM-Site-Refresh-2023?type=design&node-id=1%3A34308&t=IOdtfClI40VIAsNr-1",
      },
    ],
  },
};

// // More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = (args) => <Footer {...args} />;