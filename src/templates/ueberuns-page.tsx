import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const UeberUnsPageTemplate = ({ title, content, contentComponent }: { title: any, content: any, contentComponent: any }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h1 className="title is-size-1">
                {title}
              </h1>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

UeberUnsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const UeberUnsPage = ({ data }: { data: any }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <UeberUnsPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

UeberUnsPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default UeberUnsPage

export const ueberunsPageQuery = graphql`
  query UeberUnsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
