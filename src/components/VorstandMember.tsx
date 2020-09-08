import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

const VorstandMember = ({
  portrait,
  title,
  funktion,
  telefon,
  email,
  slug
}: {
  portrait: any,
  title: string,
  funktion: string,
  telefon: string,
  email: string,
  slug: string
}) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image mx-0">
          <Link to={slug}><Img fluid={portrait.image.childImageSharp.fluid} alt={portrait.alt} /></Link>
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <Link to={slug}><p className="title is-4">{title}</p></Link>
            <p className="subtitle is-6">{funktion}</p>
            <Link to={`tel:${telefon}`}><p className="subtitle is-6">{telefon}</p></Link>
            <Link to={`mailto:${email}`}><p className="subtitle is-6">{email}</p></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default VorstandMember