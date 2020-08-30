import React from 'react'
import { PortraitItemTemplate } from '../../templates/portrait-item'

const PortraitPagePreview = ({ entry, widgetFor }: {entry: any, widgetFor: any}) => (
  <PortraitItemTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

export default PortraitPagePreview