/* tslint:disable:no-var-requires */

import React from 'react'
import styled from 'styled-components'

const {
  version: baseVersion,
} = require('scroll-into-view-if-needed/package.json')
const {
  version: smoothVersion,
} = require('smooth-scroll-into-view-if-needed/package.json')
const {
  version: computeVersion,
} = require('compute-scroll-into-view/package.json')

const Wrapper = styled.footer`
  margin-top: 20px;
  text-align: center;
`

export default () => (
  <Wrapper className="footer">
    <div className="container">
      <div className="content has-text-centered">
        <p>
          <a href="https://github.com/stipsan/scroll-into-view-if-needed">
            GitHub
          </a>
        </p>
        <div className="field is-grouped is-grouped-centered is-grouped-multiline">
          <a
            href="https://www.npmjs.com/package/scroll-into-view-if-needed"
            className="control"
          >
            <div className="tags has-addons">
              <span className="tag is-dark">scroll-into-view-if-needed</span>
              <span className="tag is-info">{baseVersion}</span>
            </div>
          </a>
          <a
            href="https://www.npmjs.com/package/smooth-scroll-into-view-if-needed"
            className="control"
          >
            <div className="tags has-addons">
              <span className="tag is-dark">
                smooth-scroll-into-view-if-needed
              </span>
              <span className="tag is-info">{smoothVersion}</span>
            </div>
          </a>
          <a
            href="https://www.npmjs.com/package/compute-scroll-into-view"
            className="control"
          >
            <div className="tags has-addons">
              <span className="tag is-dark">compute-scroll-into-view</span>
              <span className="tag is-info">{computeVersion}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </Wrapper>
)
