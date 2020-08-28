import React from 'react'
import Img from 'gatsby-image'

const VorstandMember = ({
  portrait,
  title,
  funktion
}: {
  portrait: any,
  title: any,
  funktion: any
}) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          {typeof portrait === 'string' ?
            <p>{portrait}</p> :
            <Img fluid={portrait.image.childImageSharp.fluid} alt={portrait.alt} />}
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{title}</p>
            <p className="subtitle is-6">{funktion}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default VorstandMember