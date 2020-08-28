import React from 'react'
import VorstandMember from '../../components/VorstandMember'

const VorstandMemberPreview = ({ entry, widgetFor, getAsset }: {entry: any, widgetFor: any, getAsset: any}) => (
  <VorstandMember
    title={entry.getIn(['data', 'title'])}
    funktion={entry.getIn(['data', 'funktion'])}
    portrait={entry.getIn(['data', 'portrait'])}
  />
)

export default VorstandMemberPreview