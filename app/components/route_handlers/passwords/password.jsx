import React, {Component} from 'react';

import style from './style.js';

export default class Password extends Component {

  constructor(props) {
    super(props);
    this.navigateToEdit = this.navigateToEdit.bind(this);
  }

  render() {
    const {password} = this.props;
    return (
      <div style={style.base} onDoubleClick={this.navigateToEdit}>
        <a style={style.title} href={password.get('url')}>{password.get('name')}</a>
        <p>{`User name: ${password.get('user')}`}</p>
        <p>{`Password: ${password.get('password')}`}</p>
      </div>
    );
  }

  navigateToEdit() {
    const {password, history} = this.props;
    const url = password ? password.getEditUrl() : '/';
    history.pushState(null, url);
  }

  getTitle() {
    const {password} = this.props;
    return `Edition ${password.get('edition')}: ${password.get('title')}`;
  }

}
