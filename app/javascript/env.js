const ENV = {};

if(process.env.NODE_ENV == "development") {
  ENV.API_HOST = "https://fedeaux.ngrok.io"
} else {
  ENV.API_HOST = "https://fedeaux-dodo.herokuapp.com"
}

export default ENV;
