import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { Helmet } from 'react-helmet'

export const AdventskalenderTuerchenPageTemplate = ({ tag, content, contentComponent }: { tag: any, content: any, contentComponent: any }) => {
  const PageContent = contentComponent || Content
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
      async function getIsOpen() {
          const response = await fetch(`/.netlify/functions/ist_adventskalender_tor_offen?day=${tag}`);
          const json = await response.json();
          setIsOpen(json.isOpen);
      }
      getIsOpen();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            { isOpen ?
              <PageContent className="content" content={content} /> :
              (
                <h1>Türchen ist noch geschlossen!</h1>
              )
            }
          </div>
        </div>
      </div>
    </section>
  )
}


const AdventskalenderTuerchenPage = ({ data }: { data: any }) => {
  const { mdx: post } = data

  return (
    <Layout>
      <Helmet>
        <title>{`Tag ${post.frontmatter.tag} im Adventskalender - Schweizerischer Blindenbund Regionalgruppe Zürich`}</title>
        <meta name="description" content={`Tag ${post.frontmatter.tag} im Adventskalender`} />
        <meta property="og:title" content={`Tag ${post.frontmatter.tag} im Adventskalender`} />
        <meta property="og:description" content={`Tag ${post.frontmatter.tag} im Adventskalender`} />
        <meta property="og:url" content={`https://www.rgz-blind.ch/projekte/adventskalender-tuerchen/tag-${post.frontmatter.tag}/`} />
      </Helmet>
      <AdventskalenderTuerchenPageTemplate
        tag={post.frontmatter.tag}
        contentComponent={HTMLContent}
        content={post.body}
      />
    </Layout>
  )
}

export default AdventskalenderTuerchenPage

export const GrossmuensterModellPageQuery = graphql`
  query AdventskalenderTuerchenPage($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        tag
      }
    }
  }
`
