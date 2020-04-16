const currentProtocol = typeof window !== 'undefined' ? window.location.protocol : 'http:'
const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

const config = {
  meta: {
    author: 'Maxime Fabas',
    title: 'Libé apps template',
    url: '',
    description: '',
    image: '',
    xiti_id: 'test',
    tweet: 'Some tweet text',
  },
  tracking: {
    active: false,
    format: 'libe-apps-template',
    article: 'libe-apps-template'
  },
  show_header: true,
  statics_url: process.env.NODE_ENV === 'production'
    ? 'https://www.liberation.fr/apps/static'
    : `${currentProtocol}//${currentHostname}:3003`,
  api_url: process.env.NODE_ENV === 'production'
    ? 'https://libe-labo-2.site/api'
    : `${currentProtocol}//${currentHostname}:3004/api`,
  stylesheet: 'tu-mitonnes.css',
  spreadsheet: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRMEDHCT7NgS4u7lTlZvU3HtspGMgRo-6lRInaiQ13tSlDVa61RybKaW0VV-VuqpLW2r_6sQdAuBVAJ/pub?gid=0&single=true&output=tsv'
}

module.exports = config
