import { create } from "@storybook/theming/create"

export default create({
  base: "light",

  colorPrimary: "#5570F1",
  colorSecondary: "#5570F1",

  // UI
  appBg: "#F4F5FA",
  appContentBg: "#FFFFFF",
  appBorderRadius: 6,

  // Typography
  fontBase:
    '"Poppins", -apple-system, system-ui, BlinkMacSystemFont, sans-serif',

  brandTitle: `Cartio`,
})
