import * as React from 'react'
import { CssBaseline, GeistProvider, Page } from '@geist-ui/react'
import { ThauProvider } from 'thau-react'
import Header from 'app/components/Header'
import Landing from 'app/pages/Landing'

export default () => (
  <ThauProvider thauUrl="http://localhost:9000/api/v1">
    <GeistProvider>
      <CssBaseline />
      <Page render="effect-seo" dotBackdrop>
        <Header />
        <Page.Content>
          <Landing />
        </Page.Content>
      </Page>
    </GeistProvider>
  </ThauProvider>
)
