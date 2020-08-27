import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { navigate } from 'gatsby-link'
import Layout from '../components/Layout'
import { useState } from 'react';
import Content, { HTMLContent } from '../components/Content'

function encode(data: any) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export const AktivitaetPostTemplate = ({
  content,
  contentComponent,
  title,
  date,
  anmeldeformularanzeigen,
  helmet,
}: {
  content: any,
  contentComponent: any,
  title: any,
  date: any,
  anmeldeformularanzeigen: any,
  helmet: any,
}) => {
  const PostContent = contentComponent || Content
  const [count, setCount] = useState({});

  function handleChange(e: any) {
    setCount({ [e.target.name]: e.target.value })
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...count,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-1">
              {date} - {title}
            </h1>
            <PostContent content={content} />
            {anmeldeformularanzeigen &&
              <div>
                <br/>
                <h2 className="title is-size-2">
                  Anmeldeformular
              </h2>
                <form
                  name={date + '-' + title}
                  method="post"
                  action="/kontakt/danke/"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                >
                  {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                  <input type="hidden" name="form-name" value="contact" />
                  <div hidden>
                    <label>
                      Nicht ausfüllen:{' '}
                      <input name="bot-field" onChange={handleChange} />
                    </label>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'name'}>
                      Name
            </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'text'}
                        name={'name'}
                        onChange={handleChange}
                        id={'name'}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'email'}>
                      Email
            </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'email'}
                        name={'email'}
                        onChange={handleChange}
                        id={'email'}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'bemerkung'}>
                      Bemerkung
            </label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        name={'bemerkung'}
                        onChange={handleChange}
                        id={'bemerkung'}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <button className="button" type="submit">
                      Anmelden
            </button>
                  </div>
                </form>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  )
}

AktivitaetPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const AktivitaetPost = ({ data }: { data: any }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AktivitaetPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s - Schweizerischer Blindenbund Regionalgruppe Zürich">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        anmeldeformularanzeigen={post.frontmatter.anmeldeformularanzeigen}
      />
    </Layout>
  )
}

AktivitaetPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default AktivitaetPost

export const pageQuery = graphql`
  query AktivitaetPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        title
        anmeldeformularanzeigen
      }
    }
  }
`
