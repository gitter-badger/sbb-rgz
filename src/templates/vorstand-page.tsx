import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import VorstandMember from '../components/VorstandMember'

const VorstandPage = ({ data }: { data: any }) => {
  const { edges: members } = data.allMdx;

  return (
    <Layout>
      <Helmet>
        <title>Vorstandsmitglieder RGZ - Schweizerischer Blindenbund Regionalgruppe Zürich</title>
        <meta name="description" content='Vorstellung des Vorstands der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
        <meta property="og:title" content='Vorstandsmitglieder RGZ' />
        <meta property="og:description" content='Vorstellung des Vorstands der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
        <meta property="og:url" content='https://www.rgz-blind.ch/vorstand' />
      </Helmet>
      <section className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h1 className="title is-size-1">
                Vorstand
          </h1><div className="tile is-ancestor" style={{ flexWrap: 'wrap' }}>{members &&
                members.map(({ node: member }: { node: any }) => (
                  <div className="tile is-6 is-parent" key={member.id}>
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
      </section>
    </Layout>
  )
}

export default VorstandPage

export const vorstandPageQuery = graphql`
      query VorstandMembersQuery {
          allMdx(
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