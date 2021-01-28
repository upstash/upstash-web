import { Text, Title } from '../text'
import { TableCol, TableColTitle } from './table'
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
        <TableCol bg first>
          <Title style={{ fontWeight: 'var(--fw-bold)' }}>Free</Title>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <Title style={{ fontWeight: 'var(--fw-bold)' }}>Standard</Title>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <Title style={{ fontWeight: 'var(--fw-bold)' }}>Premium</Title>
        </TableCol>
      </Col>

      {/* -- */}
      <Col span-t="1.." className={styles.divider} />
      {/* -- */}

      <Col>
        <TableCol className={styles.featureTitle}>
          <Text>Commands Limit</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol bg>
          <TableColTitle>Commands Limit</TableColTitle>
          <Text>{PRICES.free.commandsLimit}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <TableColTitle>Commands Limit</TableColTitle>
          <Text>{PRICES.standart.commandsLimit}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <TableColTitle>Commands Limit</TableColTitle>
          <Text>{PRICES.premium.commandsLimit}</Text>
        </TableCol>
      </Col>

      {/* -- */}
      <Col span-t="1.." className={styles.divider} />
      {/* -- */}

      <Col>
        <TableCol className={styles.featureTitle}>
          <Text>Max Data Size Per DB</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol bg>
          <TableColTitle>Max Data Size Per DB</TableColTitle>
          <Text>{PRICES.free.maxDataSizePerDB}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <TableColTitle>Max Data Size Per DB</TableColTitle>
          <Text>{PRICES.standart.maxDataSizePerDB}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <TableColTitle>Max Data Size Per DB</TableColTitle>
          <Text>{PRICES.premium.maxDataSizePerDB}</Text>
        </TableCol>
      </Col>

      {/* -- */}
      <Col span-t="1.." className={styles.divider} />
      {/* -- */}

      <Col>
        <TableCol className={styles.featureTitle}>
          <Text>Max Concurrent Connections</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol bg>
          <TableColTitle>Max Concurrent Connections</TableColTitle>
          <Text>{PRICES.free.maxConcurrentConnections}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <TableColTitle>Max Concurrent Connections</TableColTitle>
          <Text>{PRICES.standart.maxConcurrentConnections}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <TableColTitle>Max Concurrent Connections</TableColTitle>
          <Text>{PRICES.premium.maxConcurrentConnections}</Text>
        </TableCol>
      </Col>

      {/* -- */}
      <Col span-t="1.." className={styles.divider} />
      {/* -- */}

      <Col>
        <TableCol className={styles.featureTitle}>
          <Text>Persistence</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol bg check={PRICES.free.persistence}>
          <TableColTitle>Persistence</TableColTitle>
        </TableCol>
      </Col>
      <Col>
        <TableCol check={PRICES.standart.persistence}>
          <TableColTitle>Persistence</TableColTitle>
        </TableCol>
      </Col>
      <Col>
        <TableCol check={PRICES.premium.persistence}>
          <TableColTitle>Persistence</TableColTitle>
        </TableCol>
      </Col>

      {/* -- */}
      <Col span-t="1.." className={styles.divider} />
      {/* -- */}

      <Col>
        <TableCol className={styles.featureTitle}>
          <Text>Encryption (TLS)</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol bg check={PRICES.free.encryption}>
          <TableColTitle>Persistence</TableColTitle>
        </TableCol>
      </Col>
      <Col>
        <TableCol check={PRICES.standart.encryption}>
          <TableColTitle>Persistence</TableColTitle>
        </TableCol>
      </Col>
      <Col>
        <TableCol check={PRICES.premium.encryption}>
          <TableColTitle>Persistence</TableColTitle>
        </TableCol>
      </Col>

      {/* -- */}
      <Col span-t="1.." className={styles.divider} />
      {/* -- */}

      <Col>
        <TableCol className={styles.featureTitle}>
          <Text>Multi Zone Replication</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol bg check={PRICES.free.multiZoneReplication}>
          <TableColTitle>Persistence</TableColTitle>
        </TableCol>
      </Col>
      <Col>
        <TableCol check={PRICES.standart.multiZoneReplication}>
          <TableColTitle>Persistence</TableColTitle>
        </TableCol>
      </Col>
      <Col>
        <TableCol check={PRICES.premium.multiZoneReplication}>
          <TableColTitle>Persistence</TableColTitle>
        </TableCol>
      </Col>

      {/* -- */}
      <Col span-t="1.." className={styles.divider} />
      {/* -- */}

      <Col>
        <TableCol className={styles.featureTitle}>
          <Text>Price</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol bg>
          <TableColTitle>100K commands</TableColTitle>
          <Text>{PRICES.free.per100kCommands}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <TableColTitle>100K commands</TableColTitle>
          <Text>{PRICES.standart.per100kCommands}</Text>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <TableColTitle>100K commands</TableColTitle>
          <Text>{PRICES.premium.per100kCommands}</Text>
        </TableCol>
      </Col>

      {/* -- */}
      <Col span-t="1.." className={styles.divider} />
      {/* -- */}

      <Col>
        <div />
      </Col>
      <Col>
        <TableCol bg last>
          <Button theme="primary">Start for free</Button>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <Button>Sign Up</Button>
        </TableCol>
      </Col>
      <Col>
        <TableCol>
          <Button>Sign Up</Button>
        </TableCol>
      </Col>
    </Grid>
  )
}

export default DesktopTable
