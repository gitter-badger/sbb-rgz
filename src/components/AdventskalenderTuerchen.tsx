import React, { useEffect, useState } from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby';

export const AdventskalenderTuerchen = ({ day, bild, link, isOpen }: { day: number, bild: any, link: any, isOpen: boolean }) => {
    return (
        <div className="tile is-3 is-parent" >
            <div className="tile is-child">
                <div className="card">
                    <div className="card-image">
                        <figure className={`image mx-0 ${!isOpen ? 'dimmed' : ''}`}>
                            {
                                isOpen ?
                                (<Link to={link}><Img fluid={bild.image.childImageSharp.fluid} alt={bild.alt} /></Link>) :
                                (<Img fluid={bild.image.childImageSharp.fluid} alt={bild.alt} />)
                            }
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    )
}