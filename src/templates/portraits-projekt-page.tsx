import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet';

const PortraitsProjektPage = ({ data }: { data: any }) => {
    const { edges: portraits } = data.allMdx;

    return (
        <Layout>
            <Helmet>
                <title>Portraits - Schweizerischer Blindenbund Regionalgruppe Zürich</title>
                <meta name="description" content='Portraits der Mitglieder der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
                <meta property="og:title" content='Portraits' />
                <meta property="og:description" content='Portraits der Mitglieder der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
                <meta property="og:url" content='https://www.rgz-blind.ch/projekte/portraits-projekt' />
            </Helmet>
            <section className="section">
                <div className="container content">
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <h1 className="title is-size-1">
                                Portraits
                                    </h1>
                            {portraits &&
                                portraits.map(({ node: portrait }: { node: any }) => (
                                    <div className="column" key={portrait.id}>
                                        <Link
                                            to={portrait.fields.slug}
                                        ><h4
                                            className="title is-size-4">{portrait.frontmatter.title}</h4></Link>

                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default PortraitsProjektPage;

export const portraitsProjektQuery = graphql`
      query portraitsProjektQuery {
          allMdx(
            sort: { order: ASC, fields: [frontmatter___title] }
            filter: {frontmatter: {templateKey: {eq: "portrait-item" } } }
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