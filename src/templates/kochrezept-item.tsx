import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const KochrezeptTemplate = ({
  title,
  autor,
  menge,
  vorbereitungszeit,
  kochzeit,
  quelle,
  zutaten,
  zubereitung,
  tipps,
  helmet,
}: {
  title: any,
  autor: any,
  menge: any,
  vorbereitungszeit: any,
  kochzeit: any,
  quelle: any,
  zutaten: any,
  zubereitung: any,
  tipps: any,
  helmet: any,
}) => {
  return (
    <article className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <header>
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {title}
              </h1>
              <p className="subtitle is-size-6">{autor}</p>
            </header>
            <section>
              <p>Menge: {menge}</p>
              <p>Vorbereitungszeit: {vorbereitungszeit}</p>
              <p>Kochzeit: {kochzeit}</p>
              <p>Quelle: {quelle}</p>
            </section>
            <section>
              <h2>Zutaten</h2>
              <div dangerouslySetInnerHTML={{ __html: zutaten }} />
            </section>
            <section>
              <h2>Zubereitung</h2>
              <div dangerouslySetInnerHTML={{ __html: zubereitung }} />
            </section>
            <section>
              <h2>Tipps</h2>
              <div dangerouslySetInnerHTML={{ __html: tipps }} />
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
          <Helmet titleTemplate="%s | Kochrezept">
            <title>{`${recipe.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${recipe.frontmatter.title}`}
            />
          </Helmet>
        }
        title={recipe.frontmatter.title}
        autor={recipe.frontmatter.autor}
        menge={recipe.frontmatter.menge}
        vorbereitungszeit={recipe.frontmatter.vorbereitungszeit}
        kochzeit={recipe.frontmatter.kochzeit}
        quelle={recipe.frontmatter.quelle}
        zutaten={recipe.frontmatter.zutaten}
        zubereitung={recipe.frontmatter.zubereitung}
        tipps={recipe.frontmatter.tipps}
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
        autor
        templateKey                
        menge
        vorbereitungszeit
        kochzeit
        quelle
        zutaten
        zubereitung
        tipps
      }
    }
  }
`
