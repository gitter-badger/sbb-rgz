import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const PortraitItemTemplate = ({
  content,
  contentComponent,
  title,
  helmet
}: {
  content: any,
  contentComponent: any,
  title: any,
  helmet?: any,
}) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-1">
              {title}
            </h1>
            <PageContent className="content" content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

const PortraitItem = ({ data }: { data: any }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <PortraitItemTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s - Schweizerischer Blindenbund Regionalgruppe Zürich">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.seodescription}`}
            />
            <meta property="og:title" content={post.frontmatter.title} />
            <meta property="og:description" content={`${post.frontmatter.seodescription}`} />
            <meta property="og:url" content={`https://www.rgz-blind.ch` + `${post.fields.slug}`} />
          </Helmet>
        }
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

export default PortraitItem

export const portraitQuery = graphql`
  query PortraitItemById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        seodescription
        photogallery {
          bild {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 400, quality: 92) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`