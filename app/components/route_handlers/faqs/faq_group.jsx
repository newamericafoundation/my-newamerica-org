import React from 'react'

import FaqItem from './faq_item.jsx'

export default class FaqGroup extends React.Component {

  render () {
    return (
      <div>
        <h2 className='page__section-title'>{this.props.section}</h2>
        { this.renderFaqs() }
      </div>
    )
  }

  renderFaqs () {
    return this.props.faqs.map((faq, i) => {
      return (
        <FaqItem
          {...this.props}
          faq={faq}
          key={i}
				/>
      )
    })
  }

}
