import React from 'react'
import Img from 'gatsby-image'

export const PhotoGallery = ({
    photogallery,
}: {
    photogallery?: any,
}) => {
    if (photogallery && photogallery.length > 0) {
        return (<div>
            <h2>Fotogallerie</h2>
            <div className="tile is-ancestor" style={{ flexWrap: 'wrap' }}>{
                photogallery.map((photogalleryImage: any) => (
                    <div className="tile is-6 is-parent" >
                        <div className="tile is-child">
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image mx-0">
                                        <Img fluid={photogalleryImage.bild.image.childImageSharp.fluid} alt={photogalleryImage.bild.alt} />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        {photogalleryImage.bild.alt}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}</div></div>)
    } else {
        return null;
    }
}