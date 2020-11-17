import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { Helmet } from 'react-helmet'
import { PhotoGallery } from '../components/PhotoGallery'

export const JubilaeumPageTemplate = ({ title, content, contentComponent, 
  photogallery }: { title: any, content: any, contentComponent: any, photogallery: any }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <PageContent className="content" content={content} />
            <PhotoGallery photogallery={photogallery}/>
          </div>
        </div>
      </div>
    </section>
  )
}


const JubilaeumPage = ({ data }: { data: any }) => {
  const { mdx: post } = data

  return (
    <Layout>
      <Helmet>
        <title>60-Jahre RGZ Jubiläum - Schweizerischer Blindenbund Regionalgruppe Zürich</title>
        <meta name="description" content='60-Jahre RGZ Jubiläum' />
        <meta property="og:title" content='60-Jahre RGZ Jubiläum' />
        <meta property="og:description" content='60-Jahre RGZ Jubiläum' />
        <meta property="og:url" content='https://www.rgz-blind.ch/projekte/60-jahre-jubilaeum-projekt/' />
      </Helmet>
      <JubilaeumPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.body}
        photogallery={post.frontmatter.photogallery}
      />
    </Layout>
  )
}

export default JubilaeumPage

export const JubiluaeumPageQuery = graphql`
  query JubilaeumPage($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title        
        photogallery {
          bild {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 400, quality: 92) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
