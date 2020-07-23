import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Img from 'gatsby-image'

const Kochrezepte2020Page = ({ data }: { data: any }) => {
  const { edges: members } = data.allMarkdownRemark;

  return (

    <Layout>
      <section className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                  Vorstand
          </h1><div className="tile is-ancestor">{members &&
                  members.map(({ node: member }: { node: any }) => (
                    <div className="tile">
                      <div className="card">
                        <div className="card-image">
                          <figure className="image">
                            <Img fixed={member.frontmatter.portrait.image.childImageSharp.fixed} alt={member.frontmatter.portrait.alt} />
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
                  ))}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

Kochrezepte2020Page.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  })
}

export default Kochrezepte2020Page;

export const kochrezepte2020Query = graphql`
      query Kochrezepte2020Query {
          allMarkdownRemark(
            filter: {frontmatter: {templateKey: {eq: "kochrezept-item" } } }
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
                      fixed(width: 400, quality: 92) {
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