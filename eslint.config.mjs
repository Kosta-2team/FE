// import statements
import { FlatCompat } from "@eslint/eslintrc";
import 'dotenv/config'; 

// FlatCompat instance for ESLint compatibility
const compat = new FlatCompat();

const eslintConfig = [
    ...compat.extends("next/core-web-vitals")
];

export default eslintConfig;
