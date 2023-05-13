const axios = require("axios");
const apiKey = process.env.API_KEY;
exports.getnews = async (filter) => {
  const url = `https://gnews.io/api/v4/search?q=${filter.keyword}&lang=en&country=${filter.country}&max=${filter.limit}&apikey=${apiKey}&in=title`;
  try {
    let data = await axios.get(url);
    return data?.data?.articles;
  } catch (error) {
    throw error;
  }
};
