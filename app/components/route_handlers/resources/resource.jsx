import React from 'react';

import * as Icons from './../../general/icons.jsx';

export default class Resource extends React.Component {

  render() {
    if (!this.shouldDisplay()) { return (<div/>); }
    const {resource} = this.props;
    const Comp = Icons.get(resource.get('icon'));
    return (
      <div style={{ display: 'inline-block', position: 'relative' }}>
        <a
          href={resource.get('url')}
          target="_blank"
          className="feature-box"
        >
          <div className="feature-box__background">
            <Comp/>
          </div>
          <div className="feature-box__top-content">
            {resource.get('name')}
          </div>
          <div className="feature-box__bottom-content"></div>
        </a>
        { this.renderEditButton() }
      </div>
    );
  }

  renderEditButton() {
    if (!window.user) { return; }
    if (!window.user.isAdmin) { return; }
		const {Build} = Icons;
    return (
      <p className='page__button' onClick={this.navigateToEdit.bind(this)}><Build/></p>
    );
  }

  shouldDisplay() {
    return this.props.resource.matchesSearchTerm(this.props.searchTerm)
  }

  navigateToEdit(e) {
    e.preventDefault()
    var url = this.props.resource ? this.props.resource.getEditUrl() : '/'
    this.props.history.pushState(null, url)
  }

}
