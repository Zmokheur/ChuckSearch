import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Media, Label, Grid, Panel, ControlLabel, FormControl, InputGroup, Button } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

const ChuckInputPure = ({ query, handleInputChange, handleSubmit }) => {
  return (
    <Panel>
      <form onSubmit={handleSubmit}>
        <ControlLabel>What Chuck said about ...</ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={query}
            placeholder="Enter text"
            onChange={handleInputChange}
          />
          <InputGroup.Button>
            <Button type="submit">
              <i className="fa fa-search"></i>&nbsp;Search
            </Button>
          </InputGroup.Button>
        </InputGroup>

      </form>
    </Panel>
  )
};

ChuckInputPure.propTypes = {
  query: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
}

const ChuckResultPure = ({ results }) => {
  if (results !== null) {

    const listItems = results.map(function(result){
      const categoryLabels = result.category !== null ? result.category.map( (category) =>
        <Label>{category}</Label>
      ) : "";

      return (
        <Media key={result.id}>
         <Media.Left>
            <a href={result.url} target="_blank">
              <img width={64} height={64} src={result.icon_url} alt="Image"/>
            </a>
          </Media.Left>
          <Media.Body>
            <blockquote><p>{result.value}</p></blockquote>
          </Media.Body>
          <Media.Right>
            {categoryLabels}
           </Media.Right>
        </Media>
      )
    });
    return (
      <div>{listItems}</div>
    );
  }
  return (
    <div>No results</div>
  )

};

ChuckResultPure.propTypes = {
  results: PropTypes.array,
}

class Chuck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let _this = this;
    axios.get('https://api.chucknorris.io/jokes/search', {
      params: {
        query: this.state.query
      }
    })
    .then(function (response) {
      _this.setState({results: response.data.result});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleInputChange(e){
    this.setState({query: e.target.value});
  }

  render() {
    return (
      <div>
        <ChuckInputPure handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} query={this.state.query} />
        <ChuckResultPure results={this.state.results} />
      </div>
    )
  }

}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">A Chuck Norris quote finder <small>powered by React</small></h1>
        </header>
        <Grid className="App-body">
          <Chuck />
        </Grid>
      </div>
    );
  }
}

export default App;
