import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet';

interface IProps {
  data: any;
}

class AktivitaetList extends React.Component<IProps, {}> {

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMdx

    return (
      <Layout>
        <Helmet>
          <title>Aktivitäten - Schweizerischer Blindenbund Regionalgruppe Zürich</title>
          <meta name="description" content='Aktivitäten der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
          <meta property="og:title" content='Aktivitäten' />
          <meta property="og:description" content='Aktivitäten der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
          <meta property="og:url" content='https://www.rgz-blind.ch/aktivitaeten/' />
        </Helmet>
        <section className="section">
          <div className="container content">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <h1 className="title is-size-1">
                  Aktivitäten
              </h1>{posts &&
                  posts.map(({ node: post }: { node: any }) => (
                    <div className="column" key={post.id}>
                      <article
                      >
                        <header><Link
                          to={post.fields.slug}
                        >
                          <h4
                            className="title is-size-4">
                            {post.frontmatter.date} - {post.frontmatter.title}
                          </h4></Link>
                        </header>
                      </article>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query AktivitaetListQuery {
        allMdx(
          sort: { order: ASC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "aktivitaet-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "DD.MM.YYYY")
              }
            }
          }
        }
      }
    `}
    render={(data: any) => <AktivitaetList data={data} />}
  />
)
