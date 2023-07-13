import Header from "/components/Sitewide/Header/Header";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Components/Sitewide/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {
    isLoggedIn: true,
  },
  parameters: {
    design: [
      {
        type: "figma",
        name: "Mobile / Desktop",
        url: "https://www.figma.com/file/6eS2lWFNlyu8xA6Pg0bU1r/TM-Design-Library?type=design&node-id=179%3A762&t=2h5KoZKc8LN3UHDB-1",
      },
    ],
  },
};

// // More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = (args) => <Header {...args} />;