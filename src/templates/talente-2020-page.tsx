import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

const Talente2020Page = ({ data }: { data: any }) => {
    const { edges: talents } = data.allMarkdownRemark;

    return (
        <Layout>
            <section className="section">
                <div className="container content">
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <div className="section">
                                <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                                    Talente
                                    </h1>
                                {talents &&
                                    talents.map(({ node: talent }: { node: any }) => (
                                        <div className="column is-6" key={talent.id}>
                                            <p className="post-meta">
                                                <Link
                                                    className="title has-text-primary is-size-4"
                                                    to={talent.fields.slug}
                                                >{talent.frontmatter.title}</Link>
                                            </p>
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
export default Talente2020Page;

export const talente2020Query = graphql`
      query Talente2020Query {
          allMarkdownRemark(
            filter: {frontmatter: {templateKey: {eq: "talent-item" } } }
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