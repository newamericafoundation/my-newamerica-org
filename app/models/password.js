import * as base from './base.js';

export class Model extends base.Model {

  get resourceName() { return 'password'; }

  get apiUrlRoot() { return '/api/v1/passwords'; }

  getViewUrl() { return null; }

  get defaults() {
    return {};
  }

  get fields() {
    return [
      {
        formComponentName: 'Text',
        formComponentProps: {
          id: 'name',
          labelText: 'Publication name',
          hint: '',
          placeholder: 'Enter publication name.'
        }
      },
      {
        formComponentName: 'Text',
        formComponentProps: {
          id: 'url',
          labelText: 'Login url',
          hint: '',
          placeholder: 'Enter URL for login page.'
        }
      },
      {
        formComponentName: 'Text',
        formComponentProps: {
          id: 'user',
          labelText: 'User Name',
          hint: '',
          placeholder: 'Enter user name.'
        }
      },
      {
        formComponentName: 'Text',
        formComponentProps: {
          id: 'password',
          labelText: 'Password',
          hint: '',
          placeholder: 'Enter password.'
        }
      }
    ];
  }

}

export class Collection extends base.Collection {

  get model() { return Model; }

  comparator(m1, m2) {
    return m1.get('user').length - m2.get('user').length;
  }

}
