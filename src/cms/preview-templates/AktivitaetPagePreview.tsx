import React from 'react'
import { AktivitaetPostTemplate } from '../../templates/aktivitaet-post'

const AktivitaetPagePreview = ({ entry, widgetFor }: {entry: any, widgetFor: any}) => (
  <AktivitaetPostTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
    date={entry.getIn(['data', 'date'])}
    anmeldeformularanzeigen={entry.getIn(['data', 'anmeldeformularanzeigen'])}
  />
)

export default AktivitaetPagePreview