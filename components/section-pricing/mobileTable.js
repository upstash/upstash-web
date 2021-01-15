import { Text, Title } from '../text'
import { TableCol, TableColTitle } from './table'
import Button from '../button'
import { PRICES } from '../../constants'
import cn from 'classnames'

import styles from './mobileTable.module.css'

function MobileTable({ className }) {
  return (
    <div className={cn(styles.table, className)}>
      {Object.keys(PRICES).map((key) => {
        return (
          <div key={key} className={styles.col}>
            <TableCol first>
              <Title
                style={{
                  fontWeight: 'var(--fw-bold)'
                }}
              >
                {key === 'free' && 'Free'}
                {key === 'standart' && 'Standard'}
                {key === 'premium' && 'Premium'}
              </Title>
            </TableCol>
            <TableCol>
              <TableColTitle>Commands Limit</TableColTitle>
              <Text>{PRICES[key].commandsLimit}</Text>
            </TableCol>
            <TableCol>
              <TableColTitle>Max Data Size Per DB</TableColTitle>
              <Text>{PRICES[key].maxDataSizePerDB}</Text>
            </TableCol>
            <TableCol>
              <TableColTitle>Max Concurrent Connections</TableColTitle>
              <Text>{PRICES[key].maxConcurrentConnections}</Text>
            </TableCol>
            <TableCol check={PRICES[key].persistence}>
              <TableColTitle>Persistence</TableColTitle>
            </TableCol>
            <TableCol check={PRICES[key].encryption}>
              <TableColTitle>Encryption (TLS)</TableColTitle>
            </TableCol>
            <TableCol check={PRICES[key].multiZoneReplication}>
              <TableColTitle>Multi Zone Replication</TableColTitle>
            </TableCol>
            <TableCol>
              <TableColTitle>100K commands</TableColTitle>
              <Text>{PRICES[key].per100kCommands}</Text>
            </TableCol>
            <TableCol last>
              {key === 'free' && (
                <Button theme="primary">Start for free</Button>
              )}
              {key !== 'free' && <Button>Login</Button>}
            </TableCol>
          </div>
        )
      })}
    </div>
  )
}

export default MobileTable
