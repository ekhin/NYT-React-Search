import axios from "axios";

const api = {

  searchArticles: (topic, startYear, endYear) => {

    const authKey = "462a94997e72401b92d8f11524378eba";
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";
    return axios.get(queryURL);
  },

  getArticle: () => {
    return axios.get("/api/v1/saves");
  },

  saveArticle: (article) => {
    return axios.post("/api/v1/saves", article);
  },

  deleteArticle: (id) => {
    return axios.delete(`/api/v1/saves/${id}`);
  }
};

export default api;
