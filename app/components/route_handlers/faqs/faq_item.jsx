import React from 'react'

import marked from 'marked'

/*
 *
 *
 */
class FaqItem extends React.Component {

	/*
	 *
	 *
	 */
  render () {
    if (!this.shouldDisplay()) { return <div /> }
    var { faq } = this.props,
      html = marked(faq.get('answer'), { sanitize: true })
    return (
      <div className='faq' onDoubleClick={this.navigateToEdit.bind(this)}>
        <p className='faq__question'>{ faq.get('question') }</p>
        <div
          className='faq__answer static-content'
          dangerouslySetInnerHTML={{ __html: html }}
				/>
      </div>
    )
  }

	/*
	 *
	 *
	 */
  shouldDisplay () {
    var { faq, searchTerm } = this.props
    return faq.matchesSearchTerm(searchTerm)
  }

	/*
	 *
	 *
	 */
  navigateToEdit () {
    var { faq, history } = this.props
    var url = faq ? faq.getEditUrl() : '/'
    return history.pushState(null, url)
  }

}

export default FaqItem
