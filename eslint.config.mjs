import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended" // 🔹 Agregar integración con Prettier
  ),
  {
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": "error", // 🔹 ESLint marcará errores si el código no cumple con Prettier
    },
  },
];

export default eslintConfig;
