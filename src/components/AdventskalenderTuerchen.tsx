import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby';

export const AdventskalenderTuerchen = ({ bild, link }: { bild: any, link: any }) => {
    return (
        <div className="tile is-3 is-parent" >
            <div className="tile is-child">
                <div className="card">
                    <div className="card-image">
                        <figure className={`image mx-0`}>
                            <Link to={link}><Img fluid={bild.image.childImageSharp.fluid} alt={bild.alt} /></Link>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    )
}