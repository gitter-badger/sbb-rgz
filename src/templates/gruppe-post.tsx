import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const GruppePostTemplate = ({
  content,
  contentComponent,
  helmet,
}: {
  content: any,
  contentComponent?: any,
  helmet?: any,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

const GruppePost = ({ data }: { data: any }) => {
  const { mdx: post } = data

  return (
    <Layout>
      <GruppePostTemplate
        content={post.body}
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
      />
    </Layout>
  )
}

export default GruppePost

export const pageQuery = graphql`
  query GruppePostByID($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body      
      fields {
        slug
      }
      frontmatter {
        title
        seodescription
      }
    }
  }
`
