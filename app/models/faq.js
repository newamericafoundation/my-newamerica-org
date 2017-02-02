import * as base from './base.js'

export class Model extends base.Model {

  get resourceName () { return 'faq' }

  get searchableFields () { return [ 'question', 'answer' ] }

  getViewUrl () { return null }

  matchesSearchTerm (searchTerm) {
    let matches = false
    if (this.get('question').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) { matches = true }
    if (this.get('answer').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) { matches = true }
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
          id: 'question',
          labelText: 'Question',
          hint: '',
          placeholder: 'Enter question.'
        }
      },
      {
        formComponentName: 'Text',
        formComponentProps: {
          id: 'answer',
          labelText: 'Answer',
          hint: '',
          placeholder: 'Enter answer.'
        }
      },
      {
        formComponentName: 'Radio',
        formComponentProps: {
          id: 'section',
          labelText: 'Section',
          options: [
            'Key Information',
            'Computers',
            'Telephones',
            'Printers',
            'Mail',
            'Moving My Stuff',
            'Scheduling Events and Booking Conference Rooms',
            'New Office Facilities',
            'Supplies, and Access',
            'Transport',
            "My Question Wasn't Answered Here"
          ],
          hint: ''
        }
      }
    ]
  }

}

export class Collection extends base.Collection {
  get model () { return Model }
}
