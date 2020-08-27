import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Img from 'gatsby-image'
import { Helmet } from 'react-helmet'

const VorstandPage = ({ data }: { data: any }) => {
  const { edges: members } = data.allMarkdownRemark;

  return (
    <Layout>
      <Helmet>
        <title>Vorstandsmitglieder RGZ - Schweizerischer Blindenbund Regionalgruppe Zürich</title>
        <meta name="description" content='Vorstellung des Vorstands der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
      </Helmet>
      <section className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h1 className="title is-size-1">
                  Vorstand
          </h1><div className="tile is-ancestor">{members &&
                  members.map(({ node: member }: { node: any }) => (
                    <div className="tile is-4 is-parent">
                      <div className="tile is-child">
                        <div className="card">
                          <div className="card-image">
                            <figure className="image">
                              <Img fluid={member.frontmatter.portrait.image.childImageSharp.fluid} alt={member.frontmatter.portrait.alt} />
                            </figure>
                          </div>
                          <div className="card-content">
                            <div className="media">
                              <div className="media-content">
                                <p className="title is-4">{member.frontmatter.title}</p>
                                <p className="subtitle is-6">{member.frontmatter.funktion}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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

VorstandPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  })
}

export default VorstandPage

export const vorstandPageQuery = graphql`
      query VorstandMembersQuery {
          allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___reihenfolge] }
            filter: {frontmatter: {templateKey: {eq: "vorstand" } } }
        ) {
          edges {
            node {
              id
              frontmatter {
                title
                funktion
                templateKey                
                portrait {
                  alt
                  image {
                    childImageSharp {
                      fluid(maxWidth: 400, quality: 92) {
                        ...GatsbyImageSharpFluid
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