import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Img from 'gatsby-image'

const ProjektePage = ({ data }: { data: any }) => {
  const { edges: projekte } = data.allMarkdownRemark;

  return (
    <Layout>
      <section className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                  Vorstand
          </h1><div className="tile is-ancestor is-vertical">{projekte &&
                  projekte.map(({ node: projekt }: { node: any }) => (
                    <div className="tile">
                      <article className="media">
                        <figure className="media-left">
                          <p className="image">
                            <Img fixed={projekt.frontmatter.bild.image.childImageSharp.fixed} alt={projekt.frontmatter.bild.alt} />
                          </p>
                        </figure>
                        <div className="media-content">
                          <div className="content">
                            <p>
                              <strong>{projekt.frontmatter.title}</strong>
                              <br />
                              {projekt.frontmatter.body}
                            </p>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

ProjektePage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  })
}

export default ProjektePage

export const projekteQuery = graphql`
      query VorstandMembersQuery {
          allMarkdownRemark(
            filter: {frontmatter: {templateKey: {eq: "projekt-item" } } }
        ) {
          edges {
          node {
          id
              frontmatter {
                title
                templateKey
                bild {
                  alt
                  image {
                    childImageSharp {
                      fixed(width: 500, quality: 92) {
                        ...GatsbyImageSharpFixed
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