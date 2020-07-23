import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const VorstandPage = ({ data }: { data: any }) => {
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
          </h1>{members &&
                  members.map(({ node: member }: { node: any }) => (
                    <div className="card">
                      <div className="card-image">
                        <figure className="image is-4by3">
                          <PreviewCompatibleImage imageInfo={member.frontmatter.portrait} />
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
                  ))}
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
                  portraitImage {
                    childImageSharp {
                      fluid(maxWidth: 526, quality: 92) {
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