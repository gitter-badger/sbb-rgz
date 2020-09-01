import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { Helmet } from 'react-helmet'

export const SpendenPageTemplate = ({ title, content, contentComponent }: { title: any, content: any, contentComponent: any }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section">
      <div className="container">
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

SpendenPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const SpendenPage = ({ data }: { data: any }) => {
  const { mdx: post } = data

  return (
    <Layout>
      <Helmet>
        <title>Spenden - Schweizerischer Blindenbund Regionalgruppe Zürich</title>
        <meta name="description" content='Wie man der Regionalgruppe Zürich des Schweizerischen Blindenbunds spendet.' />
        <meta property="og:title" content='Spenden' />
        <meta property="og:description" content='Wie man der Regionalgruppe Zürich des Schweizerischen Blindenbunds spendet.' />
        <meta property="og:url" content='https://www.rgz-blind.ch/spenden' />
      </Helmet>
      <SpendenPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.body}
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
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
      }
    }
  }
`
