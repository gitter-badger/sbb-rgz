import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet';

interface IProps {
  data: any;
}

class AktivitaetList extends React.Component<IProps, {}> {
  static propTypes: any;

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <Helmet>
          <title>Aktivitäten - Schweizerischer Blindenbund Regionalgruppe Zürich</title>
          <meta name="description" content='Aktivitäten der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
        </Helmet>
        <section className="section">
          <div className="container content">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="section">
                  <h1 className="title is-size-1">
                    Aktivitäten
              </h1>{posts &&
                    posts.map(({ node: post }: { node: any }) => (
                      <div className="column is-6" key={post.id}>
                        <article
                        >
                          <header>
                            <p>
                              <Link
                                className="title has-text-primary is-size-4"
                                to={post.fields.slug}
                              >{post.frontmatter.date} - {post.frontmatter.title}</Link>
                            </p>
                          </header>
                        </article>
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
}

AktivitaetList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  })
}

export default () => (
  <StaticQuery
    query={graphql`
      query AktivitaetListQuery {
        allMarkdownRemark(
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
