import React from 'react';
import SideBar from './side_bar.jsx';
import {Link} from 'react-router';
import {Naf} from './icons.jsx';


export default class Header extends React.Component {

  render() {
    return (
      <div className={ 'header bg-c-naf-green' }>
        <div className="header__corner">
          <Link to="/">
            <Naf />
          </Link>
        </div>
        <div className="header__main">
          <h1 className="header__main__cursive-prefix">my</h1>
          <h1 className="header__main__site-name">NEW AMERICA</h1>
        </div>
        { this.renderAuth() }
        <SideBar />
      </div>
    );
  }

  renderAuth() {
    if (!this.props.user) {
      return (
        <div className="header__auth">
          <a href='/login'>Login</a>
        </div>
      );
    }
    return (
      <div className="header__auth">
        <img src={this.getUserPhotoUrl()}></img>
        <p>{ this.getUserDisplayName() }</p>
        <a href='/logout' className='header__auth__logout'>Log out</a>
      </div>
    );
  }

  getUserDisplayName() {
    if (!this.props.user) { return; }
    return this.props.user.displayName;
  }

  getUserPhotoUrl() {
    if (!this.props.user || !this.props.user.image) { return; }
    return this.props.user.image.url;
  }

}
