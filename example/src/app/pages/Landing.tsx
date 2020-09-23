import * as React from 'react'
import {
  Card,
  ButtonGroup,
  Button,
  Display,
  Link,
} from '@geist-ui/react'
import {
  Codesandbox,
  Github,
  Grid as GridIcon,
  Package,
} from '@geist-ui/react-icons'
import Thau from 'app/components/Thau'

export default () => (
  <Card shadow>
    <h2>Thau-react example</h2>
    <Display>
      <Thau />
    </Display>
    <Display>
      <ButtonGroup
        style={{ overflowX: 'auto', width: 'calc(100% - 16pt)' }}
      >
        <Button icon={<Codesandbox />} auto>
          <Link
            href="https://thau.quester-app.dev/api/v1/swagger"
            target="_blank"
          >
            Swagger
              </Link>
        </Button>
        <Button icon={<Github />} auto>
          <Link href="https://github.com/thau-quester" target="_blank">
            GitHub
              </Link>
        </Button>
        <Button icon={<GridIcon />} auto>
          <Link
            href="https://hub.docker.com/repository/docker/mgrin/thau"
            target="_blank"
          >
            Docker
              </Link>
        </Button>
        <Button icon={<Package />} auto>
          <Link
            href="https://www.npmjs.com/package/thau-react"
            target="_blank"
          >
            NPM
              </Link>
        </Button>
      </ButtonGroup>
    </Display>
  </Card>
)
