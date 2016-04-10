import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import Clipboard from 'clipboard';

const clipboardHandlerRefKey = 'clipboard-handler';
const passwordFieldId = 'pass';

export default class Password extends Component {

  constructor(props) {
    super(props);
    this.navigateToEdit = this.navigateToEdit.bind(this);
  }

  render() {
    const {password} = this.props;
    return (
      <div onDoubleClick={this.navigateToEdit}>
        <h2 className='page__section-title'>{password.get('name')}</h2>
        <a className='link' href={password.get('url')}>Login page</a>
        <p>{`User name: ${password.get('user')}`}</p>
        <input
          type='password'
          value={password.get('password')}
          id={passwordFieldId}
          readOnly={true}
        />
        <div
          className='button'
          data-clipboard-target={`#${passwordFieldId}`}
          onClick={this.copyToClipboard}
          ref={clipboardHandlerRefKey}
        ><p>Copy to clipboard</p></div>
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

  componentDidMount() {
    const node = findDOMNode(this.refs[clipboardHandlerRefKey]);
    this.clipboard = new Clipboard(node);
  }

  componentWillUnmount() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }

}
