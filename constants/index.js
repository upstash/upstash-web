export const PRICES = {
  free: {
    commandsLimit: 'Max 10.000 Commands Daily',
    maxDataSizePerDB: '256 MB',
    maxConcurrentConnections: '20',
    persistence: true,
    encryption: true,
    multiZoneReplication: false,
    per100kCommands: 'Free'
  },
  standart: {
    commandsLimit: 'Unlimited',
    maxDataSizePerDB: '10 GB',
    maxConcurrentConnections: '1000',
    persistence: true,
    encryption: true,
    multiZoneReplication: false,
    per100kCommands: '$0.2 per 100K commands plus disk storage cost'
  },
  premium: {
    commandsLimit: 'Unlimited',
    maxDataSizePerDB: '500 GB',
    maxConcurrentConnections: '10.000',
    persistence: true,
    encryption: true,
    multiZoneReplication: true,
    per100kCommands: '$0.4 per 100K commands plus disk storage cost'
  }
}

export const HIGHLIGHT_THEME = {
  hljs: {
    textAlign: 'left',
    display: 'block',
    overflowX: 'auto',
    padding: '24px',
    fontSize: '.96rem',
    background: 'var(--c-bg-light)',
    borderRadius: 'var(--radius-m)',
    color: 'var(--c-text)'
  },
  'hljs-subst': {
    color: '#444'
  },
  'hljs-comment': {
    color: '#888888'
  },
  'hljs-keyword': {
    color: '#FFEFBD'
  },
  'hljs-attribute': {},
  'hljs-selector-tag': {},
  'hljs-meta-keyword': {},
  'hljs-doctag': {},
  'hljs-name': {},
  'hljs-type': {},
  'hljs-string': {
    color: '#D1ADFF'
  },
  'hljs-number': {},
  'hljs-selector-id': {},
  'hljs-selector-class': {},
  'hljs-quote': {},
  'hljs-template-tag': {},
  'hljs-deletion': {},
  'hljs-title': {},
  'hljs-section': {},
  'hljs-regexp': {},
  'hljs-symbol': {},
  'hljs-variable': {},
  'hljs-template-variable': {},
  'hljs-link': {},
  'hljs-selector-attr': {},
  'hljs-selector-pseudo': {},
  'hljs-literal': {},
  'hljs-built_in': {},
  'hljs-bullet': {},
  'hljs-code': {},
  'hljs-addition': {},
  'hljs-meta': {},
  'hljs-meta-string': {},
  'hljs-emphasis': {},
  'hljs-strong': {}
}
