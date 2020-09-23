# thau-react

React wrapper around Thau API

# Installation
```
npm install thau-js thau-react
```

or

```
yarn add thau-js thau-react
```

# Usage

Wrap your application with `ThauProvider`:

```tsx
import { ThauProvider } from 'react-thau'

export default function App() {
  <ThauProvider thauUrl="http://localhost:9000/api/v1">
    ...
  </ThauProvider>
}
```

And now down in the tree you can use any of the available exported hooks (see documentation for more details about each of the hooks):
* `useThau()`
* `useCreateUserWithPassword()`
* `useSession()`
* `useOpenSessions()`
* `useUserProviders()`
* `useLoginWithFacebook()`
* `useLoginWithGoogle()`
* `useLoginWithGithub()`
* `useLoginWithTwitter()`
* `useLoginWithLinkedIn()`
* `useLoginWithPassword()`
* `useLogout()`
