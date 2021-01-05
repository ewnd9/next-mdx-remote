import React from 'react'
import hydrate from 'next-mdx-remote/hydrate'

import * as widgets from '../../widgets/src'

export const App = ({ source }) => {
  const content = hydrate(source, { components: widgets })

  return (
    <div>
      <div>header</div>
      <div>{content}</div>
    </div>
  )
}
