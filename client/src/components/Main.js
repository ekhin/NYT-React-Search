import React, { Component } from "react";
import Saved from "./Saved";
import Search from "./Search";
import Results from "./Results";
import API from "../utils/axiosApi";
import moment from "moment";
import swal from "sweetalert";
class Main extends Component {

  state = {
    topic: "",
    startYear: "",
    endYear: "",
    articles: [],
    saved: []
  };


  componentDidMount() {
    this.getSavedArticles()
  }

  getSavedArticles = () => {
    API.getArticle()
      .then((res) => {
        this.setState({ saved: res.data });
      });
  }


  renderArticles = () => {
    return this.state.articles.map(article => (
      <Results
        _id={article._id}
        key={article._id}
        title={article.headline.main}
        date={moment(article.pub_date).format("YYYY-MM-DD hh:mm:ss")}
        url={article.web_url}
        handleSaveButton={this.handleSaveButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  renderSavedArticles = () => {
    return this.state.saved.map(save => (
      <Saved
        _id={save._id}
        key={save._id}
        title={save.title}
        date={moment(save.date).format("YYYY-MM-DD hh:mm:ss A") }
        url={save.url}
        handleDeleteButton={this.handleDeleteButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  handleTopicChange = (event) => {
    this.setState({ topic: event.target.value });
  }


  handleStartYearChange = (event) => {
    this.setState({ startYear: event.target.value });
  }

  handleEndYearChange = (event) => {
    this.setState({ endYear: event.target.value });
  }


  handleFormSubmit = (event) => {
    event.preventDefault();

    API.searchArticles(this.state.topic, this.state.startYear, this.state.endYear)
      .then((res) => {
        console.log(res.data.response.docs);
        if(res.data.response.docs.length <= 0){
          swal("Articles not found!");
        }
        this.setState({ articles: res.data.response.docs.slice(0, 5) });

      });
  }

  handleSaveButton = (id) => {
    const findArticleByID = this.state.articles.find((el) => el._id === id);
    console.log("findArticleByID: ", findArticleByID);
    const newSave = {title: findArticleByID.headline.main, date: findArticleByID.pub_date, url: findArticleByID.web_url};
    API.saveArticle(newSave)
    .then(this.getSavedArticles());
  }

  handleDeleteButton = (id) => {
    API.deleteArticle(id)
      .then(this.getSavedArticles());
  }

  render() {
    return (

      <div className="main-container">
        <div className="container">
          {/* Jumbotron */}
          <div className="jumbotron">
            <h1 className="text-center"><strong>New York Times Article Search</strong></h1>
            <h2 className="text-center">Search for and save articles of interest.</h2>
          </div>
          {/* Search Form and Results Section */}
          <Search
            handleTopicChange={this.handleTopicChange}
            handleStartYearChange={this.handleStartYearChange}
            handleEndYearChange={this.handleEndYearChange}
            handleFormSubmit={this.handleFormSubmit}
            renderArticles={this.renderArticles}
          />
          {/* Saved Articles Section */}
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title">
                      <strong>
                        <i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong>
                    </h3>
                  </div>
                  <div className="panel-body">
                    <ul className="list-group">
                      {this.renderSavedArticles()}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer>
            <hr />
            <p className="pull-right">
              <i className="fa fa-github" aria-hidden="true"></i>
              Proudly built using React.js
            </p>
          </footer>
        </div>
      </div>

    );
  }

}

export default Main;
