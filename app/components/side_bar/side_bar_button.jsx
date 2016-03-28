import React, {Component} from 'react';
import {Link} from 'react-router';

import Icons from './../general/icons.jsx';

export default class SideBarButton extends Component {

  constructor(props) {
    super(props);
    this.setTitle = this.setTitle.bind(this);
    this.clearTitle = this.clearTitle.bind(this);
  }

  render() {
    const IconComp = Icons.get(this.props.button.reactIconName);
    return (
      <li className='atl__side-bar__icon' onMouseEnter={this.setTitle} onMouseLeave={this.clearTitle}>
        <Link to={ this.props.button.url }>
          <IconComp/>
        </Link>
      </li>
    );
  }

  setTitle() {
    this.props.changeTitle(this.props.button.title);
  }

  clearTitle() {
    this.props.changeTitle('');
  }

}
