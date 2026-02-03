import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["cjs", "esm"],
  dts: {
    resolve: true,
  },
  minify: true,
  clean: true,
  external: ["react", "react-dom"],
  noExternal: [
    "lucide-react",
    "@radix-ui/react-popover",
    "clsx",
    "tailwind-merge",
  ],
  sourcemap: true,
  treeshake: true,
  // O tsup usará o seu postcss.config.js automaticamente aqui
  splitting: false,
});
