import * as base from './base.js'

export class Model extends base.Model {

  get resourceName () { return 'resource' }

  get searchableFields () { return [ 'name', 'url', 'icon' ] }

  getViewUrl () { return null }

  matchesSearchTerm (searchTerm) {
    var matches = false
    if (String(this.get('name')).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) { matches = true }
    if (String(this.get('icon')).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) { matches = true }
    return matches
  }

  getGroupName () {
    return this.get('section')
  }

  get fields () {
    return [
      {
        formComponentName: 'Text',
        formComponentProps: {
          id: 'name',
          labelText: 'Resource name',
          hint: '',
          placeholder: 'Enter resource name. This appears as title in the list.'
        }
      },
      {
        formComponentName: 'Radio',
        formComponentProps: {
          id: 'section',
          labelText: 'Section',
          hint: '',
          options: [ 'General Policies', 'Development', 'IT', 'Finance', 'TDM', 'Payroll & Taxes', 'Organization Information', 'Other' ],
          placeholder: 'Enter resource section. Content is organized under these group headings.'
        }
      },
      {
        formComponentName: 'Radio',
        formComponentProps: {
          id: 'icon',
          labelText: 'Display icon',
          hint: '',
          options: [ 'naf', 'weather', 'shipping', 'pages', 'building', 'calendar', 'envelope', 'page', 'wifi', 'credit-card', 'food', 'help', 'adp', 'calendar', 'jazz' ],
          placeholder: 'Choose icon.'
        }
      },
      {
        formComponentName: 'Text',
        formComponentProps: {
          id: 'url',
          labelText: 'Url',
          hint: '',
          placeholder: 'Enter url.'
        }
      }
    ]
  }

}

export class Collection extends base.Collection {
  get model () { return Model }
}
