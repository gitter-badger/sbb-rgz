import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';

const searchClient = algoliasearch(process.env.GATSBY_ALGOLIA_APPLICATION_ID!, process.env.GATSBY_ALGOLIA_SEARCH_KEY!);

function Hit(props: any) {
  return (
    <div>
      <Link className="has-text-primary" to={props.hit.path}>{props.hit.description}</Link>
    </div>
  );
}

const Kochrezepte2020Page = ({ data }: { data: any }) => {
  const { edges: recipes } = data.allMarkdownRemark;

  return (

    <Layout>
      <section className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h1 className="title is-size-1">
                  Kochrezepte
          </h1>
                <InstantSearch searchClient={searchClient} indexName={process.env.GATSBY_ALGOLIA_INDEX!}>
                  <SearchBox />
                  <Hits hitComponent={Hit} />
                </InstantSearch>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

Kochrezepte2020Page.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  })
}

export default Kochrezepte2020Page;

export const kochrezepte2020Query = graphql`
      query Kochrezepte2020Query {
          allMarkdownRemark(
            filter: {frontmatter: {templateKey: {eq: "kochrezept-item" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `