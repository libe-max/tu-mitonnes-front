const currentProtocol = typeof window !== 'undefined' ? window.location.protocol : 'http:'
const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

const config = {
  meta: {
    author: 'Libé Labo',
    title: 'Faites à la maison',
    url: 'https://www.liberation.fr/apps/2020/03/selection-articles-liberation',
    description: 'Musique, food, séries… retrouvez notre sélection d\'articles utiles en cette période de confinement.',
    image: 'https://www.liberation.fr/apps/2020/03/selection-articles-liberation/social.jpg',
    xiti_id: 'faites-a-la-maison',
    tweet: 'Musique, food, séries… retrouvez la sélection d\'articles de «Libération» utiles en cette période de confinement.',
  },
  tracking: {
    active: false,
    format: 'tu-mitonnes',
    article: 'faites-a-la-maison'
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
