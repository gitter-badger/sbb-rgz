import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { Helmet } from 'react-helmet'

export const GrossmuensterModellPageTemplate = ({ title, content, contentComponent }: { title: any, content: any, contentComponent: any }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <PageContent className="content" content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}


const GrossmuensterModellPage = ({ data }: { data: any }) => {
  const { mdx: post } = data

  return (
    <Layout>
      <Helmet>
        <title>Grossmünster Modell Reparatur Projekt - Schweizerischer Blindenbund Regionalgruppe Zürich</title>
        <meta name="description" content='Das Projekt um das Modell des Grossmünsters zu reparieren.' />
        <meta property="og:title" content='Grossmünster Modell Reparatur Projekt' />
        <meta property="og:description" content='Das Projekt um das Modell des Grossmünsters zu reparieren.' />
        <meta property="og:url" content='https://www.rgz-blind.ch/projekte/Grossmünster-Modell-Projekt/' />
      </Helmet>
      <GrossmuensterModellPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.body}
      />
    </Layout>
  )
}

export default GrossmuensterModellPage

export const GrossmuensterModellPageQuery = graphql`
  query GrossmuensterModellPage($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
      }
    }
  }
`
