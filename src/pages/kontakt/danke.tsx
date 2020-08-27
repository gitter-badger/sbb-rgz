import React from 'react'
import Layout from '../../components/Layout'
import { Helmet } from 'react-helmet'

export default () => (
  <Layout>
    <Helmet>
      <title>Kontaktbestätigung - Schweizerischer Blindenbund Regionalgruppe Zürich</title>
      <meta name="description" content='Bestätigung des Kontaktes mit der Regionalgruppe Zürich.' />
    </Helmet>
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h1 className="title is-size-2">
                Danke!
              </h1>
              <p>Wir haben deine Nachricht erhalten und melden uns baldmöglichst.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)
