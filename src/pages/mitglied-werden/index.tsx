import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'
import { Helmet } from 'react-helmet'

function encode(data: any) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Mitglied werden - Schweizerischer Blindenbund Regionalgruppe Zürich</title>
          <meta name="description" content='Anmeldeformular, um Mitglied zu werden bei der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
        </Helmet>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <h1 className="title is-size-1">
                  Anmeldeformular als Mitglied
                  </h1>
                <form
                  name="mitglied-werden"
                  method="post"
                  action="/kontakt/danke/"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={this.handleSubmit}
                >
                  {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                  <input type="hidden" name="form-name" value="contact" />
                  <div hidden>
                    <label>
                      Nicht ausfüllen:{' '}
                      <input name="bot-field" onChange={this.handleChange} />
                    </label>
                  </div>
                  <div className="field">
                    <label className="label">
                      Art der Mitgliedschaft
                    </label>
                    <div className="control">
                      <label className="radio">
                        <input type="radio" name="mitgliedschaft" value="Aktivmitglied"
                          onChange={this.handleChange} />
                       Aktivmitglied
                      </label>
                      <label className="radio">
                        <input type="radio" name="mitgliedschaft" value="Passivmitglied"
                          onChange={this.handleChange} />
                        Passivmitglied
                      </label>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">
                      Anrede
                    </label>
                    <div className="control">
                      <label className="radio">
                        <input type="radio" name="anrede" value="Herr"
                          onChange={this.handleChange} />
                       Herr
                      </label>
                      <label className="radio">
                        <input type="radio" name="anrede" value="Frau"
                          onChange={this.handleChange} />
                        Frau
                      </label>
                    </div>
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
                        onChange={this.handleChange}
                        id={'name'}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'strasse'}>
                      Strasse
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'text'}
                        name={'strasse'}
                        onChange={this.handleChange}
                        id={'strasse'}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'plzort'}>
                      PLZ und Ort
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'text'}
                        name={'plzort'}
                        onChange={this.handleChange}
                        id={'plzort'}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'kanton'}>
                      Kanton
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'text'}
                        name={'kanton'}
                        onChange={this.handleChange}
                        id={'kanton'}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'telefonprivat'}>
                      Telefon Privat
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'tel'}
                        name={'telefonprivat'}
                        onChange={this.handleChange}
                        id={'telefonprivat'}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'telefongeschaeft'}>
                      Telefon Geschäft
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'tel'}
                        name={'telefongeschaeft'}
                        onChange={this.handleChange}
                        id={'telefongeschaeft'}
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
                        onChange={this.handleChange}
                        id={'email'}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'beruf'}>
                      Beruf
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'text'}
                        name={'beruf'}
                        onChange={this.handleChange}
                        id={'beruf'}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'geburtsdatum'}>
                      Geburtsdatum
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'date'}
                        name={'geburtsdatum'}
                        onChange={this.handleChange}
                        id={'geburtsdatum'}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'zivilstand'}>
                      Zivilstand
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'text'}
                        name={'zivilstand'}
                        onChange={this.handleChange}
                        id={'zivilstand'}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">
                      Grad der Sehbehinderung
                    </label>
                    <div className="control">
                      <label className="radio">
                        <input type="radio" name="grad-sehbehinderung" value="Keine Sehbehinderung"
                          onChange={this.handleChange} />
                       keine Sehbehinderung
                      </label>
                      <label className="radio">
                        <input type="radio" name="grad-sehbehinderung" value="stark sehbehindert"
                          onChange={this.handleChange} />
                        stark sehbehindert
                      </label>
                      <label className="radio">
                        <input type="radio" name="grad-sehbehinderung" value="Sehrest"
                          onChange={this.handleChange} />
                        Sehrest
                      </label>
                      <label className="radio">
                        <input type="radio" name="grad-sehbehinderung" value="blind"
                          onChange={this.handleChange} />
                        blind
                      </label>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'seit-wann-sehbehindert-oder-blind'}>
                      Falls sehbehindert oder blind, seit wann?
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'text'}
                        name={'seit-wann-sehbehindert-oder-blind'}
                        onChange={this.handleChange}
                        id={'seit-wann-sehbehindert-oder-blind'}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'erwartungen-sbb'}>
                      Was erwarten Sie vom Schweizerischen Blindenbund?
                    </label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        name={'erwartungen-sbb'}
                        onChange={this.handleChange}
                        id={'erwartungen-sbb'}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">
                      Welche Beratungsstelle würden Sie ggf. aufsuchen?
                    </label>
                    <div className="control">
                      <label className="radio">
                        <input type="radio" name="aufzusuchende-beratungsstelle" value="Aarau"
                          onChange={this.handleChange} />
                       Aarau
                      </label>
                      <label className="radio">
                        <input type="radio" name="aufzusuchende-beratungsstelle" value="Brig"
                          onChange={this.handleChange} />
                        Brig
                      </label>
                      <label className="radio">
                        <input type="radio" name="aufzusuchende-beratungsstelle" value="Schaffhausen"
                          onChange={this.handleChange} />
                        Schaffhausen
                      </label>
                      <label className="radio">
                        <input type="radio" name="aufzusuchende-beratungsstelle" value="Thun"
                          onChange={this.handleChange} />
                        Thun
                      </label>
                      <label className="radio">
                        <input type="radio" name="aufzusuchende-beratungsstelle" value="Uznach"
                          onChange={this.handleChange} />
                        Uznach
                      </label>
                      <label className="radio">
                        <input type="radio" name="aufzusuchende-beratungsstelle" value="Winterthur"
                          onChange={this.handleChange} />
                        Winterthur
                      </label>
                      <label className="radio">
                        <input type="radio" name="aufzusuchende-beratungsstelle" value="Zürich"
                          onChange={this.handleChange} />
                        Zürich
                      </label>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">
                      Können Sie Blindenschrift lesen?
                    </label>
                    <div className="control">
                      <p>
                        <label className="checkbox">
                          <input type="checkbox" name="kann-vollschrift-lesen" value="Kann Vollschrift lesen"
                            onChange={this.handleChange} />
                       Kann Vollschrift lesen
                      </label></p>
                      <p><label className="checkbox">
                        <input type="checkbox" name="kann-kurzschrift-lesen" value="Kann Kurzschrift lesen"
                          onChange={this.handleChange} />
                        Kann Kurzschrift lesen
                      </label></p>
                      <p><label className="checkbox">
                        <input type="checkbox" name="kann-blindenschrift-nicht-lesen" value="Kann Blindenschrift nicht"
                          onChange={this.handleChange} />
                        Kann Blindenschrift nicht
                      </label></p>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">
                      In welcher Form möchten Sie die Unterlagen des Schweizerischen Blindenbundes erhalten?
                    </label>
                    <div className="control">
                      <p>
                        <label className="checkbox">
                          <input type="checkbox" name="unterlagen-in-schwarzschrift" value="in Schwarzschrift (per Post)"
                            onChange={this.handleChange} />
                       in Schwarzschrift (per Post)
                      </label></p>
                      <p><label className="checkbox">
                        <input type="checkbox" name="unterlagen-in-blindenschrift" value="in Blindenschrift (Kurzschrift, nur in deutsch)"
                          onChange={this.handleChange} />
                        in Blindenschrift (Kurzschrift, nur in deutsch)
                      </label></p>
                      <p><label className="checkbox">
                        <input type="checkbox" name="unterlagen-per-email" value="per E-Mail"
                          onChange={this.handleChange} />
                        per E-Mail
                      </label></p>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">
                      Besitzen Sie einer der folgenden Ausweiskarten?
                    </label>
                    <div className="control">
                      <p>
                        <label className="checkbox">
                          <input type="checkbox" name="besitzt-begleiterkarte" value="Besitzt Begleiterkarte"
                            onChange={this.handleChange} />
                       Begleiterkarte ("Ausweiskarte für behinderteReisende") der Schweiz. Transportunternehmen
                      </label></p>
                      <p><label className="checkbox">
                        <input type="checkbox" name="besitzt-jahreskarte-voev" value="Besitzt Jahreskarte VöV"
                          onChange={this.handleChange} />
                          Jahreskarte für Blinde und Sehbehinderte des VöV (Nahverkehrsunternehmungen)?
                      </label></p>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'aufmerksam-auf-sbb-durch-wen'}>
                      Durch wen sind Sie auf den Schweizerischen Blindenbund aufmerksam gemacht worden?
                  </label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        name={'aufmerksam-auf-sbb-durch-wen'}
                        onChange={this.handleChange}
                        id={'aufmerksam-auf-sbb-durch-wen'}
                      />
                    </div>
                  </div>                  
                  <div className="field">
                    <label className="label">
                    Um ihre Aufgaben wahrnehmen zu können, sind unsere Regionalgruppen auf aktive Mitarbeit ihrer Mitglieder sowie freiwillige Helfende angewiesen. Dürfen wir Sie bei Bedarf anfragen, ob Sie bereits sind, mitzuhelfen?
                    </label>
                    <div className="control">
                      <label className="radio">
                        <input type="radio" name="anfrage-mithilfe-erlaubt" value="Ja"
                          onChange={this.handleChange} />
                       Ja
                      </label>
                      <label className="radio">
                        <input type="radio" name="anfrage-mithilfe-erlaubt" value="Nein"
                          onChange={this.handleChange} />
                        Nein
                      </label>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">
                      Möchten Sie an den Veranstaltungen der Regionalgruppe teilnehmen und Einladungen dafür erhalten?
                    </label>
                    <div className="control">
                      <label className="radio">
                        <input type="radio" name="moechte-an-veranstaltungen-teilnehmen" value="Ja"
                          onChange={this.handleChange} />
                       Ja
                      </label>
                      <label className="radio">
                        <input type="radio" name="moechte-an-veranstaltungen-teilnehmen" value="Nein"
                          onChange={this.handleChange} />
                        Nein
                      </label>
                    </div>
                  </div>
                  <div className="field">
                    <button className="button" type="submit">
                      Anmeldung abschicken
                  </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
