import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const KochrezeptTemplate = ({
  title,
  content,
  helmet,
}: {
  title: any,
  content: any,
  helmet: any,
}) => {
  return (
    <article className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <header>
              <h1 className="title is-size-1">
                {title}
              </h1>
            </header>
            <section>
              <HTMLContent content={content} />
            </section>
          </div>
        </div>
      </div>
    </article>
  )
}

const Kochrezept = ({ data }: { data: any }) => {
  const { markdownRemark: recipe } = data

  return (
    <Layout>
      <KochrezeptTemplate
        helmet={
          <Helmet titleTemplate="Kochrezept %s - Schweizerischer Blindenbund Regionalgruppe Zürich">
            <title>{`${recipe.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${recipe.frontmatter.title}`}
            />
          </Helmet>
        }
        title={recipe.frontmatter.title}
        content={recipe.html}
      />
    </Layout>
  )
}

Kochrezept.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Kochrezept

export const kochrezeptQuery = graphql`
  query KochrezeptByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        templateKey
      }
    }
  }
`
