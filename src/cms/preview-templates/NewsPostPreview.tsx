import React from 'react'
import PropTypes from 'prop-types'
import { NewsPostTemplate } from '../../templates/news-post'

const NewsPostPreview = ({ entry, widgetFor }: { entry: any, widgetFor: any }) => {
  return (
    <NewsPostTemplate
      content={widgetFor('body')}
      body={entry.getIn(['data', 'body'])}
      title={entry.getIn(['data', 'title'])}
    />
  )
}

NewsPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default NewsPostPreview
