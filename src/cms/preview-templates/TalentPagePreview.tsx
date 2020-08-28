import React from 'react'
import { UeberUnsPageTemplate } from '../../templates/ueberuns-page'
import { TalentItemTemplate } from '../../templates/talent-item'

const TalentPagePreview = ({ entry, widgetFor }: {entry: any, widgetFor: any}) => (
  <TalentItemTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

export default TalentPagePreview