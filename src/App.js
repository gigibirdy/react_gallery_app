import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Nav from './components/Nav.component.js';
import axios from 'axios';
import apiKey from './config.js';

class App extends Component {
  constructor(){
    super();
    this.state = {
      results: [],
      isLoading: true
    }
    this.search = this.search.bind(this);
  };
  //render 24 images once component is mounted
  componentDidMount(){
    this.search('cats');
  };
  //search method to request data from API endpoint, then update the state
  search(query){
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          results: response.data.photos.photo,
          isLoading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      })
  };
  render(){
    return (
      <div className="container">
        <Switch>
          <Route exact path='/' render={(routeProps) => <Nav results={this.state.results} isLoading={this.state.isLoading} onSearch={this.search} {...routeProps}/>}/>
          <Route exact path='/search' render={(routeProps) => <Nav results={this.state.results} isLoading={this.state.isLoading} onSearch={this.search} {...routeProps}/>}/>
          <Route exact path='/search/:query' render={(routeProps) => <Nav results={this.state.results} isLoading={this.state.isLoading} onSearch={this.search} {...routeProps}/>}/>
          <Route exact path='/cats' render={(routeProps) => <Nav results={this.state.results} isLoading={this.state.isLoading} onSearch={this.search} {...routeProps}/>}/>
          <Route exact path='/dogs' render={(routeProps) => <Nav results={this.state.results} isLoading={this.state.isLoading} onSearch={this.search} {...routeProps}/>}/>
          <Route exact path='/computers' render={(routeProps) => <Nav results={this.state.results} isLoading={this.state.isLoading} onSearch={this.search} {...routeProps}/>}/>
          <Route render={ () => <h3 className="not-found">404 Page not found.</h3> }/>
        </Switch>
      </div>
    );
  }
};

export default App;
