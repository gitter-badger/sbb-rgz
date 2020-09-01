import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet';

const KochrezepteProjektPage = ({ data }: { data: any }) => {
  const { group: recipes } = data.allMarkdownRemark;
  return (
    <Layout>
      <Helmet>
        <title>Kochrezepte - Schweizerischer Blindenbund Regionalgruppe Zürich</title>
        <meta name="description" content='Kochrezepte der Mitglieder der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
        <meta property="og:title" content='Kochrezepte' />
        <meta property="og:description" content='Kochrezepte der Mitglieder der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
        <meta property="og:url" content='https://www.rgz-blind.ch/projekte/kochrezepte-projekt' />
      </Helmet>
      <section className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h1 className="title is-size-1">
                Kochrezepte
          </h1>
              {recipes &&
                recipes.map((category: any) => (
                  <div className="column" key={category.fieldValue}>
                    <h2
                          className="title is-size-2">{category.fieldValue}</h2>
                    {category.edges &&
                      category.edges.map(({node: recipe}: {node: any}) => (
                        <div key={recipe.id}>                        
                        <Link
                          to={recipe.fields.slug}
                        ><h4
                          className="title is-size-4">{recipe.frontmatter.title}</h4></Link></div>
                      ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default KochrezepteProjektPage;

export const kochrezepteProjektQuery = graphql`
      query KochrezepteProjektQuery {
          allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___title] }
            filter: {frontmatter: {templateKey: {eq: "kochrezept-item" } } }
        ) {
          group(field: frontmatter___kategorie) {
            fieldValue
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
      }
    `