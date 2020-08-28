import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet';

const Kochrezepte2020Page = ({ data }: { data: any }) => {
  const { edges: recipes } = data.allMarkdownRemark;

  return (
    <Layout>
      <Helmet>
        <title>Kochrezepte - Schweizerischer Blindenbund Regionalgruppe Zürich</title>
        <meta name="description" content='Kochrezepte der Mitglieder der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
      </Helmet>
      <section className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h1 className="title is-size-1">
                  Kochrezepte
          </h1>
          {recipes &&
                                    recipes.map(({ node: recipe }: { node: any }) => (
                                        <div className="column" key={recipe.id}>
                                            <Link
                                                to={recipe.fields.slug}
                                            ><h4
                                                className="title is-size-4">{recipe.frontmatter.title}</h4></Link>

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
            sort: { order: ASC, fields: [frontmatter___title] }
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