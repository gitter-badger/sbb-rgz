import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet';

const KochrezepteProjektPage = ({ data }: { data: any }) => {
  const { edges: recipes } = data.allMarkdownRemark;

  return (
    <Layout>
      <Helmet>
        <title>Kochrezepte - Schweizerischer Blindenbund Regionalgruppe Zürich</title>
        <meta name="description" content='Kochrezepte der Mitglieder der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
        <meta property="og:title" content='Kochrezepte' />
        <meta property="og:description" content='Kochrezepte der Mitglieder der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
        <meta property="og:url" content='https://www.rgz-blind.ch/kochrezepte-projekt' />
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

KochrezepteProjektPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  })
}

export default KochrezepteProjektPage;

export const kochrezepteProjektQuery = graphql`
      query KochrezepteProjektQuery {
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