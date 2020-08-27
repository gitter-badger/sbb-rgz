import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet';

interface IProps {
  data: any;
}

class NewsList extends React.Component<IProps, {}> {
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
                            <p className="post-meta">
                              <Link
                                className="title has-text-primary is-size-4"
                                to={post.fields.slug}
                              >{post.frontmatter.title}</Link>
                              <br />
                              <span className="subtitle is-6 is-block">
                                Veröffentlicht am: {post.frontmatter.date}
                              </span>
                            </p>
                          </header>
                          <p>
                            {post.excerpt}
                          </p>
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

NewsList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  })
}

export default () => (
  <StaticQuery
    query={graphql`
      query NewsListQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "news-post" } } }
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
    render={(data: any) => <NewsList data={data} />}
  />
)
