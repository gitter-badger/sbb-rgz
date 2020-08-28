import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

export const TalentItemTemplate = ({
  content,
  title,
  helmet
}: {
  content: any,
  title: any,
  helmet?: any,
}) => {

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-1">
              {title}
            </h1>
            <HTMLContent content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

const TalentItem = ({ data }: { data: any }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <TalentItemTemplate
        content={post.html}
        helmet={
          <Helmet titleTemplate="%s - Schweizerischer Blindenbund Regionalgruppe Zürich">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.title}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

export default TalentItem

export const talentQuery = graphql`
  query TalentItemById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`