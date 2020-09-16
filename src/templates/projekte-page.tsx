import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Img from 'gatsby-image'
import { Helmet } from 'react-helmet'

const ProjektePage = ({ data }: { data: any }) => {
  const { edges: projekte } = data.allMdx;
  return (
    <Layout>
      <Helmet>
        <title>Projekte - Schweizerischer Blindenbund Regionalgruppe Zürich</title>
        <meta name="description" content='Projekte der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
        <meta property="og:title" content='Projekte' />
        <meta property="og:description" content='Projekte der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
        <meta property="og:url" content='https://www.rgz-blind.ch/projekte' />
      </Helmet>
      <section className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h1 className="title is-size-1">
                Projekte
          </h1><div className="tile is-ancestor" style={{ flexWrap: 'wrap' }}>{projekte &&
                projekte.map(({ node: projekt }: { node: any }) => (
                  <div className="tile is-6 is-parent" key={projekt.id}>
                    <div className="tile is-child">
                      <div className="card">
                        <div className="card-image">
                          <figure className="image mx-0">
                            <Link to={projekt.frontmatter.link}><Img fluid={projekt.frontmatter.bild.image.childImageSharp.fluid} alt={projekt.frontmatter.bild.alt} /></Link>
                          </figure>
                        </div>
                        <div className="card-content">
                          <div className="media">
                            <div className="media-content">
                              <p className="title is-4"><Link to={projekt.frontmatter.link}><strong>{projekt.frontmatter.title}</strong></Link></p>
                            </div>
                          </div>                          
                          <div className="content">
                            {projekt.frontmatter.beschreibung}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ProjektePage

export const projekteQuery = graphql`
      query ProjekteQuery {
          allMdx(
            sort: { order: ASC, fields: [frontmatter___reihenfolge] }
            filter: {frontmatter: {templateKey: {eq: "projekt-item" } } }
        ) {
          edges {
          node {
              id
              frontmatter {
                title
                link
                templateKey
                beschreibung
                bild {
                  alt
                  image {
                    childImageSharp {
                      fluid(maxWidth: 400, quality: 92) {
                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `