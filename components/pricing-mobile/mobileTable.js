import { Text, Title } from '../text'
import { TableCol, TableColTitle } from '../section-pricing/table'
import Button from '../button'
import { PRICES } from '../../constants'
import cn from 'classnames'

import styles from './mobileTable.module.css'

function MobileTable({ className }) {
  return (
    <div className={cn(styles.table, className)}>
      {['free', 'standard', 'premium'].map((key) => {
        return (
          <div key={key} className={styles.col}>
            <TableCol first>
              <Title
                style={{
                  fontWeight: 'var(--fw-bold)'
                }}
              >
                {key === 'free' && 'Free'}
                {key === 'standard' && 'Standard'}
                {key === 'premium' && 'Premium'}
              </Title>
            </TableCol>
            <TableCol>
              <TableColTitle>{PRICES.commandsLimit.title}</TableColTitle>
              <Text>{PRICES.commandsLimit[key]}</Text>
            </TableCol>
            <TableCol>
              <TableColTitle>{PRICES.maxDataSizePerDB.title}</TableColTitle>
              <Text>{PRICES.maxDataSizePerDB[key]}</Text>
            </TableCol>
            <TableCol>
              <TableColTitle>
                {PRICES.maxConcurrentConnections.title}
              </TableColTitle>
              <Text>{PRICES.maxConcurrentConnections[key]}</Text>
            </TableCol>
            <TableCol check={PRICES.persistence[key]}>
              <TableColTitle>{PRICES.persistence.title}</TableColTitle>
            </TableCol>
            <TableCol check={PRICES.encryption[key]}>
              <TableColTitle>{PRICES.encryption.title}</TableColTitle>
            </TableCol>
            <TableCol check={PRICES.multiZoneReplication[key]}>
              <TableColTitle>{PRICES.multiZoneReplication.title}</TableColTitle>
            </TableCol>
            <TableCol>
              <TableColTitle>{PRICES.price.title}</TableColTitle>
              <Text>{PRICES.price[key]}</Text>
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
