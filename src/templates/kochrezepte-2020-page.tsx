import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Img from 'gatsby-image'

const Kochrezepte2020Page = ({ data }: { data: any }) => {
  const { edges: recipes } = data.allMarkdownRemark;

  return (

    <Layout>
      <section className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                  Vorstand
          </h1><div className="tile is-ancestor">{recipes &&
                  recipes.map(({ node: recipe }: { node: any }) => (
                    <p><Link className="has-text-primary" to={recipe.fields.slug}>{recipe.frontmatter.title}</Link></p>
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
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `