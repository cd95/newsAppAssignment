const gnewsHelper = require("../helper/gnews.helper");
const { Error400 } = require("../helper/error.helper");
const NodeCache = require("node-cache");
const myCache = new NodeCache();
exports.getNews = async (filters) => {
  if (filters.limit < 1 || filters.limit > 10) {
    throw new Error400("Limit should be between 1 and 10");
  }
  try {
    const cacheKey = generateCacheKey(filters);

    let cacheData = findInCache(cacheKey);

    if (cacheData != undefined || cacheData != null) {
      return cacheData;
    }
    const news = await gnewsHelper.getnews(filters);

    setDataInCache(cacheKey, news);

    return news;
  } catch (error) {
    throw error;
  }
};

function findInCache(key) {
  return myCache.get(key);
}
function setDataInCache(key, value) {
  myCache.set(key, value, parseInt(process.env.CACHE_TTL) || 60);
}
function generateCacheKey(params) {
  let cacheKey = "";
  for (const [key, value] of Object.entries(params)) {
    cacheKey += value;
  }
  return cacheKey;
}
