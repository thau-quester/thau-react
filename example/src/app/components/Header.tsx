import * as React from 'react'
import { Page, Grid, Image, Text, Row, Spacer, Divider, Link } from '@geist-ui/react'
import Logo from 'img/logo-image.png'


export default () => {
  return (
    <Page.Header>
      <Spacer />
      <Grid.Container justify="space-between" alignItems="center">
        <Grid>
          <Row align="middle">
            <Link href="/">
              <Image src={Logo} width={48} height={48} />
              <Spacer />
              <Text h2>Thau</Text>
            </Link>
          </Row>
        </Grid>
        <Grid />
      </Grid.Container>
      <Divider />
    </Page.Header>
  )
}
