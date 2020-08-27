import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const SpendenPageTemplate = ({ title, content, contentComponent }: { title: any, content: any, contentComponent: any }) => {
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

SpendenPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const SpendenPage = ({ data }: { data: any }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SpendenPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

SpendenPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default SpendenPage

export const spendenPageQuery = graphql`
  query SpendenPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
