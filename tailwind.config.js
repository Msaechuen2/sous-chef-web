const {nextui} = require('@nextui-org/theme');
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|autocomplete|avatar|button|calendar|card|checkbox|dropdown|image|input|link|listbox|menu|navbar|pagination|popover|progress|select|slider|toggle|table|tabs|user|divider|ripple|spinner|scroll-shadow|spacer).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
};
