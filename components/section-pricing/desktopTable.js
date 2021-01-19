import { Text, Title } from '../text'
import { TableCol } from './table'
import { Col, Grid } from '../grid'
import cn from 'classnames'
import Button from '../button'
import { PRICES } from '../../constants'

import styles from './desktopTable.module.css'

function DesktopTable({ className }) {
  return (
    <Grid col={4} className={cn(styles.table, className)}>
      <Col>
        <div />
      </Col>
      <Col>
        <TableCol first>
          <Title style={{ fontWeight: 'var(--fw-bold)' }}>Free</Title>
        </TableCol>
      </Col>
      <Col>
        <TableCol first bg>
          <Title style={{ fontWeight: 'var(--fw-bold)' }}>Standard</Title>
        </TableCol>
      </Col>
      <Col>
        <TableCol first>
          <Title style={{ fontWeight: 'var(--fw-bold)' }}>Premium</Title>
        </TableCol>
      </Col>

      {/* -- */}
      <Col span-t="1.." className={styles.divider} />
      {/* -- */}

      <Col>
        <TableCol className={styles.featureTitle}>
          <Text>{PRICES.commandsLimit.title}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <Text>{PRICES.commandsLimit.free}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol bg>
          <Text>{PRICES.commandsLimit.standard}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <Text>{PRICES.commandsLimit.premium}</Text>
        </TableCol>
      </Col>

      {/* -- */}
      <Col span-t="1.." className={styles.divider} />
      {/* -- */}

      <Col>
        <TableCol className={styles.featureTitle}>
          <Text>{PRICES.maxDataSizePerDB.title}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <Text>{PRICES.maxDataSizePerDB.free}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol bg>
          <Text>{PRICES.maxDataSizePerDB.standard}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <Text>{PRICES.maxDataSizePerDB.premium}</Text>
        </TableCol>
      </Col>

      {/* -- */}
      <Col span-t="1.." className={styles.divider} />
      {/* -- */}

      <Col>
        <TableCol className={styles.featureTitle}>
          <Text>{PRICES.maxConcurrentConnections.title}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <Text>{PRICES.maxConcurrentConnections.free}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol bg>
          <Text>{PRICES.maxConcurrentConnections.standard}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <Text>{PRICES.maxConcurrentConnections.premium}</Text>
        </TableCol>
      </Col>

      {/* -- */}
      <Col span-t="1.." className={styles.divider} />
      {/* -- */}

      <Col>
        <TableCol className={styles.featureTitle}>
          <Text>{PRICES.persistence.title}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol check={PRICES.persistence.free} />
      </Col>
      <Col>
        <TableCol bg check={PRICES.persistence.standard} />
      </Col>
      <Col>
        <TableCol check={PRICES.persistence.premium} />
      </Col>

      {/* -- */}
      <Col span-t="1.." className={styles.divider} />
      {/* -- */}

      <Col>
        <TableCol className={styles.featureTitle}>
          <Text>{PRICES.encryption.title}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol check={PRICES.encryption.free} />
      </Col>
      <Col>
        <TableCol bg check={PRICES.encryption.standard} />
      </Col>
      <Col>
        <TableCol check={PRICES.encryption.premium} />
      </Col>

      {/* -- */}
      <Col span-t="1.." className={styles.divider} />
      {/* -- */}

      <Col>
        <TableCol className={styles.featureTitle}>
          <Text>{PRICES.multiZoneReplication.title}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol check={PRICES.multiZoneReplication.free} />
      </Col>
      <Col>
        <TableCol bg check={PRICES.multiZoneReplication.standard} />
      </Col>
      <Col>
        <TableCol check={PRICES.multiZoneReplication.premium} />
      </Col>

      {/* -- */}
      <Col span-t="1.." className={styles.divider} />
      {/* -- */}

      <Col>
        <TableCol className={styles.featureTitle}>
          <Text>{PRICES.price.title}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <Text>{PRICES.price.free}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol bg>
          <Text>{PRICES.price.standard}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <Text>{PRICES.price.premium}</Text>
        </TableCol>
      </Col>

      {/* -- */}
      <Col span-t="1.." className={styles.divider} />
      {/* -- */}

      <Col>
        <div />
      </Col>
      <Col>
        <TableCol last>
          <Button theme="primary">Start for free</Button>
        </TableCol>
      </Col>
      <Col>
        <TableCol last bg>
          <Button>Login</Button>
        </TableCol>
      </Col>
      <Col>
        <TableCol last>
          <Button>Login</Button>
        </TableCol>
      </Col>
    </Grid>
  )
}

export default DesktopTable
