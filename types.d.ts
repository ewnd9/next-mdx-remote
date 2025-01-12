import * as React from 'react'

export declare namespace MdxRemote {
  /** An object containing components to be made available within mdx content */
  interface Components {
    [componentName: string]: React.FunctionComponent | React.Component
  }

  /** Format of the output from renderToString and input to hydrate */
  interface Source {
    compiledSource: string
    renderedOutput: string
    scope?: Record<string, unknown>
  }
}
