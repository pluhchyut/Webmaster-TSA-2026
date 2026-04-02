import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: ["coverage/**", "src/generated/prisma/**"],
  },
  ...nextVitals,
];

export default eslintConfig;
