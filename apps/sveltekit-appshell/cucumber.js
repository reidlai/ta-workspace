export default {
  default: {
    parallel: 2,
    format: ["summary", "progress-bar"],
    paths: ["../../features/**/*.feature"],
    import: ["tests/integration/**/*.steps.ts"],
    formatOptions: { snippetInterface: "async-await" },
  },
};
