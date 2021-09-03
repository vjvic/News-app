import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsItem from "components/News/NewsItem/NewsItem";
import { Grid, Typography } from "@material-ui/core";

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNews = () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://api.newscatcherapi.com/v2/latest_headlines",
      params: { countries: "ph", lang: "en", page: "1", page_size: "25" },
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
        "x-rapidapi-host": "free-news.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setNews(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  console.log(news);

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Latest News
      </Typography>

      <Grid container spacing={3}>
        {news.articles &&
          news.articles.map((item) => (
            <NewsItem key={item._id} item={item} loading={loading} />
          ))}
      </Grid>
    </>
  );
};

export default Home;
