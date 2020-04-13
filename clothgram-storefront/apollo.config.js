module.exports = {
  client: {
    service: {
      name: "saleor",
      url: "https://api-clothgram.kube.rukjaana.com/graphql/",
      includes: ["./**/*.js", "./**/*.ts"],
      excludes: ["**/__tests__/**/*"],
    },
  },
};
