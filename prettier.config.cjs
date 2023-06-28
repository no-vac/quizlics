/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  overrides: [
    {
      files: ["**/*.tsx", "**/*.ts"],
      options: {
        tabWidth: 2
      }
    }
  ]

};

module.exports = config;
