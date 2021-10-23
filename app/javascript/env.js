const ENV = {
  API_HOST: (process.env.API_HOST || "https://fedeaux.ngrok.io"),
  // API_HOST: "https://dodo.fedeaux.com",
  PLATFORM: (process.env.PLATFORM || "web"),
};

export default ENV;
