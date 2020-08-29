import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { Helmet } from 'react-helmet'

export const ImpressumPageTemplate = ({ title, content, contentComponent }: { title: any, content: any, contentComponent: any }) => {
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

ImpressumPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const ImpressumPage = ({ data }: { data: any }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <Helmet>
        <title>Impressum - Schweizerischer Blindenbund Regionalgruppe Zürich</title>
        <meta name="description" content='Das Impressum der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
        <meta property="og:title" content='Impressum' />
        <meta property="og:description" content='Das Impressum der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
        <meta property="og:url" content='https://www.rgz-blind.ch/impressum' />
      </Helmet>
      <ImpressumPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

ImpressumPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ImpressumPage

export const impressiumPageQuery = graphql`
  query ImpressumPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
