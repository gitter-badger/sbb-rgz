import React from 'react'
import { Link, graphql } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import Img from 'gatsby-image'

export const IndexPageTemplate = ({
  title,
  content,
  contentComponent,
  activities,
  projects
}: {
  title: any,
  content: any,
  contentComponent?: any,
  activities: any,
  projects: any
}) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-1">
              {title}
            </h1>
          </div>
        </div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <PageContent className="content" content={content} />
          </div>
        </div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="content">
              <h2>
                Aktivitäten
              </h2>
              <div className="tile is-ancestor" style={{ flexWrap: 'wrap' }}>{activities &&
                activities.map(({ node: activity }: { node: any }) => (
                  <div className="tile  is-parent" key={activity.id}>
                    <div className="tile is-child">
                      <div className="card">
                        <div className="card-content">
                          <div className="media">
                            <div className="media-content">
                              <p className="title is-4"><Link
                          to={activity.fields.slug}
                        >{activity.frontmatter.title}</Link></p>
                              <p className="subtitle is-6">{activity.frontmatter.date}</p>
                            </div>
                          </div>
                          <div className="content">
                            {activity.excerpt}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}</div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="content">
              <h2>
                Projekte
              </h2>
              <div className="tile is-ancestor">{projects &&
                projects.map(({ node: projekt }: { node: any }) => (
                  <div className="tile is-parent" key={projekt.id}>
                    <div className="tile is-child">
                      <div className="card">
                        <div className="card-image">
                          <figure className="image mx-0">
                            <Link to={`/projekte/` + `${projekt.frontmatter.link}`}><Img fluid={projekt.frontmatter.bild.image.childImageSharp.fluid} alt={projekt.frontmatter.bild.alt} /></Link>
                          </figure>
                        </div>
                        <div className="card-content">
                          <div className="media">
                            <div className="media-content">
                              <p className="title is-4"><Link to={`/projekte/` + `${projekt.frontmatter.link}`}><strong>{projekt.frontmatter.title}</strong></Link></p>
                            </div>
                          </div>
                          <div className="content">
                            {projekt.frontmatter.beschreibung}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}</div>
            </div>
          </div>
        </div>
      </div>
    </section>)
}

const IndexPage = ({ data }: { data: any }) => {
  const { index: post, activities: activities, projects: projects } = data

  return (
    <Layout>
      <Helmet>
        <title>Schweizerischer Blindenbund Regionalgruppe Zürich</title>
        <meta name="description" content='Webseite der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
        <meta property="og:title" content='Regionalgruppe Zürich des Schweiz. Blindenbunds' />
        <meta property="og:description" content='Webseite der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
        <meta property="og:url" content='https://www.rgz-blind.ch/' />
      </Helmet>
      <IndexPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        activities={activities.edges}
        projects={projects.edges}
      />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate ($currentDate: Date!) {
    index: markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
      }
    }
    activities: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "aktivitaet-post" }, date: { gte: $currentDate } } }
      limit: 3
    ) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "dddd, DD.MM.YYYY", locale: "de")
          }
        }
      }
    }
    projects: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___reihenfolge] }
      filter: {frontmatter: {templateKey: {eq: "projekt-item" } } }
      limit: 3
    ) {
    edges {
      node {
          id
          frontmatter {
            title
            link
            templateKey
            beschreibung
            bild {
              alt
              image {
                childImageSharp {
                  fluid(maxWidth: 200, quality: 92) {
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
