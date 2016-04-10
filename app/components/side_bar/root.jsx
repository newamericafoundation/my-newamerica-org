import React, {Component} from 'react';
import classNames from 'classnames';

import SideBarButton from './side_bar_button.jsx';

import buttons from './buttons.js';

export default class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
    this.changeTitle = this.changeTitle.bind(this);
  }

  render() {
    const cls = classNames({
      'atl__side-bar': true,
      'atl__side-bar--naf-green': true
    });
    return (
      <div className={cls} onClick={this.toggle}>
        <div className='atl__side-bar__title'>{this.state.title}</div>
        <ul className='atl__side-bar__icons'>
          {this.renderButtons()}
        </ul>
      </div>
    );
  }

  renderButtons() {
    return buttons.map((button, i) => {
      return (
        <SideBarButton
          button={button}
          changeTitle={this.changeTitle}
          key={i}
        />
      );
    });
  }

  changeTitle(title) {
    this.setState({title: title});
  }

}
