import React from 'react'
import VorstandMember from '../../templates/vorstandmember'

const VorstandMemberPreview = ({ entry, widgetFor, getAsset }: {entry: any, widgetFor: any, getAsset: any}) => (
  <VorstandMember
    title={entry.getIn(['data', 'title'])}
    funktion={entry.getIn(['data', 'funktion'])}
    portrait={getAsset(entry.getIn(['data', 'portrait'])).toString()}
  />
)

export default VorstandMemberPreview