import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
import NotFound from './NotFound.component.js';
import Photo from './Photo.component';

export default class Nav extends Component{
  //call onSearch method, request data, update state isLoading to true and update the url when one of the nav links is clicked.
  handleClick = (e) => {
    e.preventDefault();
    this.props.onSearch(e.target.textContent);
    this.props.history.push(`/${e.target.textContent.toLowerCase()}`)
    this.props.toggleLoading();
  };

  //call onSearch method, request data, update state isLoading to true and update the url when user enters clicks submit button in search field.
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.query.value);
    this.props.history.push(`/search/${this.query.value}`);
    this.props.toggleLoading();
    e.currentTarget.reset();
  };

  render(){
    let result;
    //if there are match results, pass the data into Photo component
    if(this.props.results.length > 0) {
      result = this.props.results.map(result =>
        <Photo
        key={result.id}
        url={`https://farm${result.farm}.staticflickr.com/${result.server}/${result.id}_${result.secret}.jpg`}
        />
      );
      //if there is no match, render NotFound component.
    } else {result = <NotFound />;}

    return(
      <div>
        <form className="search-form" onSubmit = {this.handleSubmit}>
          <Link to='/search' style={{'width': 460}}>
            <input type="search" name="search" placeholder="Search" ref={(input) => this.query = input} required/>
          </Link>
          <button type="submit" className="search-button">
            <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </button>
        </form>
        <nav className="main-nav">
          <ul>
            <li><NavLink exact to ='/cats' onClick={this.handleClick}>Cats</NavLink></li>
            <li><NavLink exact to ='/dogs' onClick={this.handleClick}>Dogs</NavLink></li>
            <li><NavLink exact to ='/computers' onClick={this.handleClick}>Computers</NavLink></li>
          </ul>
        </nav>
        <div className="photo-container">
          <h2>Results</h2>
          <ul>
            {
              (this.props.isLoading)
              ?
              //render a loading message before receiving data
              <h3 className="not-found">Loading...</h3>
              //render result once data arrives
              : result
            }
          </ul>
        </div>
      </div>
    );
  }
};
