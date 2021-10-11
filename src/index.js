const {
  BaseKonnector,
  requestFactory,
  scrape,
  log,
  utils,
  signin
} = require('cozy-konnector-libs')

const request = requestFactory({
  // The debug mode shows all the details about HTTP requests and responses. Very useful for
  // debugging but very verbose. This is why it is commented out by default
  debug: true,
  // Activates [cheerio](https://cheerio.js.org/) parsing on each page
  cheerio: true,
  // If cheerio is activated do not forget to deactivate json parsing (which is activated by
  // default in cozy-konnector-libs
  json: false,
  // This allows request-promise to keep cookies between requests
  jar: true
})

const VENDOR = 'template'
const baseUrl = 'https://www.totalenergies.fr'

const courl = baseUrl + "/clients/connexion"

const homeurl = baseUrl + "/clients/accueil"

module.exports = new BaseKonnector(start)

// The start function is run by the BaseKonnector instance only when it got all the account
// information (fields). When you run this connector yourself in "standalone" mode or "dev" mode,
// the account information come from ./konnector-dev-config.json file
// cozyParameters are static parameters, independents from the account. Most often, it can be a
// secret api key.
async function start(fields, cozyParameters) {
  log('info', 'Authenticating ...')
  if (cozyParameters) log('debug', 'Found COZY_PARAMETERS')
  await authenticate.bind(this)(fields.login, fields.password)
  log('info', 'Successfully logged in')
  // The BaseKonnector instance expects a Promise as return of the function

}


async function authenticate(username, password) {
  log('debug', 'auth')
  const $ = await signin({
    url: courl,
    formSelector: "#fz-authentificationForm",
    formData: {
      "tx_demmauth_authentification[authentificationForm][login]": username,
      "tx_demmauth_authentification[authentificationForm][password]": password
    },
    resolveWithFullResponse: true
  })
  .catch(err => {
    log('err', err)
  })
  .then(resp => {
    log('info', resp.text())
  })

}


