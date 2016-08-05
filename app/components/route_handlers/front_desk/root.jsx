import React, {Component} from 'react';

import {Building} from './../../general/icons.jsx';

export default class FrontDesk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: true
    };
    this.toggleChecked = this.toggleChecked.bind(this);
  }

  render() {
    return (
      <div className='page'>
        <div className='page__content'>
          <div className='page__content__logo'>
            <Building/>
          </div>
          <h1 className='title'>Front Desk Sign In</h1>
          <form style={{width: '100%'}} action='https://www.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8' method='POST'>
            <input type='hidden' name='oid' value='00DF00000005p1z'/>
            <input type='hidden' name='retURL' value='http://www.newamerica.org'/>

            <div className='form__wrapper'>
              <label htmlFor='first_name'>First Name</label>
              <input placeholder='First Name' id='first_name' maxLength='40' name='first_name' size='20' type='text'/>
            </div>

            <div className='form__wrapper'>
              <label htmlFor='last_name'>Last Name</label>
              <input placeholder='Last Name' id='last_name' maxLength='80' name='last_name' size='20' type='text'/>
            </div>

            <div className='form__wrapper'>
              <label htmlFor='email'>Email</label>
              <input placeholder='E-mail' id='email' maxLength='80' name='email' size='20' type='text'/>
            </div>

            <div className='form__wrapper'>
              <label htmlFor='00NF000000DdOxX'>Who are you visiting?</label>
              <input placeholder='Enter Name' id='00NF000000DdOxX' maxLength='255' name='00NF000000DdOxX' size='20' type='text'/>
            </div>

            <div className='form__wrapper'>
              <label htmlFor='00NF000000DdOxc'>Purpose of visit</label>
              <input placeholder='Purpose Of Visit' id='00NF000000DdOxc' maxLength='255' name='00NF000000DdOxc' size='20' type='text'/>
            </div>

            <div className='form__wrapper'>
              <label htmlFor='00NF000000DdQ0m'>Subscribe me to New America's weekly digital newsletter and events emails</label>
              <input
                onChange={this.toggleChecked}
                id='00NF000000DdQ0m'
                name='00NF000000DdQ0m'
                type='checkbox'
                checked={this.state.isChecked}
                value='1'
              />
            </div>

            <input style={{backgroundColor: '#2dbbb3', color: '#fffaef', borderRadius: '4px'}} type='submit' name='submit' value='Submit'/>

          </form>
        </div>
      </div>
    );
  }

  renderDebuggingFields() {
    return [
      <input type='hidden' name='debug' value='1'/>,
      <input type='hidden' name='debugEmail' value='mccarthyl@newamerica.org'/>
    ];
  }

  toggleChecked() {
    this.setState({
      isChecked: !this.state.isChecked
    });
  }
}
