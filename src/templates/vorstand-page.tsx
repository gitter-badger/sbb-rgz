import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import VorstandMember from './vorstandmember'

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
          </h1><div className="tile is-ancestor" style={{ flexWrap: 'wrap' }}>{members &&
                  members.map(({ node: member }: { node: any }) => (
                    <div className="tile is-6 is-parent">
                      <div className="tile is-child">
                        <VorstandMember portrait={member.frontmatter.portrait}
                          title={member.frontmatter.title}
                          funktion={member.frontmatter.funktion} />
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