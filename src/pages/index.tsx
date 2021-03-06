/* tslint:disable:jsx-no-multiline-js jsx-no-lambda no-parameter-reassignment no-var-requires */

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import scrollIntoView from 'smooth-scroll-into-view-if-needed'
import styled, { createGlobalStyle } from 'styled-components'
import systemFontStack from 'system-font-stack'
import Helmet from 'react-helmet'

import Alignment from '../components/Examples/Alignment'
import Boundary from '../components/Examples/Boundary'
import IfNeeded from '../components/Examples/IfNeeded'
import OverrideBehavior from '../components/Examples/OverrideBehavior'
import Footer from '../components/Footer'
import { Chrome, Text as TextIcon } from '../components/Icons'
import Section from '../components/Section'

import 'bulma/css/bulma.min.css'

const { description } = require('scroll-into-view-if-needed/package.json')

const GlobalStyles = createGlobalStyle`
  html,
  body {
    margin: 0!important;
    padding: 0!important;
  }
  body {
    font-family: ${systemFontStack}!important;
  }
`

const Hero = styled.header`
  display: flex;
  box-sizing: border-box;
  padding: 90px 10px;
  padding-top: 10vmin;
  padding-bottom: 10vmin;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(168deg, #b1d2fa 0%, #05ffe6 100%);
  background: -moz-linear-gradient(
    -78deg,
    rgb(182, 209, 245) 0%,
    rgb(114, 249, 231) 100%
  ); /* FF3.6-15 */
`
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 744px;

  svg {
    width: 100%;
    height: auto;
  }

  > svg {
    z-index: 1;
    position: relative;
  }
`
const ScrollWrapper = styled.div`
  position: absolute;
  transition: opacity 100ms;
  /* overflow: scroll; is so ugly on machines that don't hide scrollbars */
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 3px;
  opacity: 0.6;

  @supports (mix-blend-mode: difference) {
    opacity: 1;
    mix-blend-mode: difference;

    svg {
      color: #557271;
    }
  }
`

const IntroductionSection = styled(Section)`
  margin-top: 1.5rem !important;

  padding-bottom: 3rem !important;
  margin-bottom: 3rem !important;
  position: relative;

  :after {
    content: '';
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 0;
    height: 2px;
    background: #f5f5f5;
  }
`

const OtherSection = styled(Section).attrs({
  className: 'columns is-multiline is-desktop',
})``

const SectionIntro = styled.div.attrs({
  className: 'column is-one-third-desktop',
})`
  min-width: 250px;
`
const SectionCode = styled.div.attrs({
  className: 'column is-two-thirds-desktop',
})``

const IndexPage: React.FC = () => {
  const [maxHeight, setMaxHeight] = useState('auto')
  const maxHeightRef = useRef<SVGElement>(null)
  const scrollToRef = useRef<SVGElement>(null)
  const scrollToBoundary = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    setMaxHeight(`${maxHeightRef.current.getBoundingClientRect().height}px`)
  }, [])
  useEffect(
    () => {
      if (maxHeight !== 'auto') {
        const timeout = setTimeout(() => {
          scrollIntoView(scrollToRef.current, {
            block: 'end',
            duration: 600,
            // easeInOutQuint
            ease: t =>
              t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
            boundary: scrollToBoundary.current,
          })
        }, 1500)

        return () => clearTimeout(timeout)
      }
    },
    [maxHeight]
  )

  return (
    <div>
      <GlobalStyles />
      <Helmet>
        <title>{description}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:description" content={description} />
        <meta name="description" content={description} />
      </Helmet>
      <Hero>
        <Wrapper ref={scrollToBoundary}>
          <Chrome ref={maxHeightRef} />
          <ScrollWrapper
            style={{
              maxHeight: maxHeight,
              opacity: maxHeight === 'auto' ? 0 : undefined,
            }}
          >
            <TextIcon ref={scrollToRef} />
          </ScrollWrapper>
        </Wrapper>
      </Hero>
      <div className="container is-fluid">
        <IntroductionSection className="columns">
          <div className="column">
            <h2 className="is-size-4">Ponyfill</h2>
            <p>
              This package <a href="http://ponyfill.com/">ponyfills</a>
              &nbsp;new features in the&nbsp;
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView">
                Element.scrollIntoView
              </a>{' '}
              API. Including features in the non-standard{' '}
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded">
                Element.scrollIntoViewIfNeeded
              </a>{' '}
              API, that the CSS working group is{' '}
              <a href="https://github.com/w3c/csswg-drafts/pull/1805">
                proposing
              </a>{' '}
              to add to <code>scrollIntoVIew</code> as another option:{' '}
              <code>scrollMode: "if-needed"</code>.
            </p>
          </div>
          <div className="column">
            <h2 className="is-size-4">Minimal</h2>
            <p>
              The core package <code>scroll-into-view-if-needed</code> is
              unapologetically small and dependency-free. That is why{' '}
              <code>behavior: "smooth"</code> is only ponyfilled if you use the
              add-on package <code>smooth-scroll-into-view-if-needed</code>. You
              don't need the add-on if native smooth scrolling is enough.
            </p>
          </div>
          <div className="column">
            <h2 className="is-size-4">Customizable</h2>
            <p>
              A couple of options not in the spec by the CSS working group helps
              customize scrolling to your needs. Avoid scrolling unwanted parent
              elements by using the <code>boundary: Element</code> option. Pass
              a function to <code>behavior</code> to customize exactly how
              elements are scrolled when <code>smooth</code> isn't enough.
            </p>
          </div>
        </IntroductionSection>
        <OtherSection id="scrolling-if-needed">
          <SectionIntro>
            <h3 className="title">Scrolling if needed</h3>
            <p className="subtitle">
              When deciding if scrolling is needed the visibility of the target
              element is checked. If it's less than 100% it will be scrolled.
            </p>
            <p>
              By default the browser controls the scrolling when{' '}
              <code>behavior: 'smooth'</code> (unless you opt in to the
              ponyfill). Note there's browser differences with native smooth
              scrolling, like{' '}
              <a
                href="https://user-images.githubusercontent.com/81981/38905887-9c00eff2-42b3-11e8-86aa-41ef679a54af.gif"
                rel="noopener noreferrer"
                target="_blank"
              >
                Chrome
              </a>{' '}
              vs{' '}
              <a
                href="https://user-images.githubusercontent.com/81981/38905963-3065b790-42b4-11e8-9fab-35393d7b7d09.gif"
                rel="noopener noreferrer"
                target="_blank"
              >
                FireFox
              </a>{' '}
              in this{' '}
              <a href="https://codepen.io/stipsan/pen/NMxLew">CodePen</a>.
            </p>
          </SectionIntro>
          <SectionCode>
            <IfNeeded />
          </SectionCode>
        </OtherSection>
        <OtherSection id="scroll-alignment">
          <SectionIntro>
            <h3 className="title">Scroll alignment</h3>
            <p className="subtitle">
              The position options for both <code>block</code> and{' '}
              <code>inline</code> are supported. Mix and match to your heart's
              content.
            </p>
            <p>
              Usually <code>block</code> aligns vertically, while{' '}
              <code>inline</code> aligns horizontally. It depends on the{' '}
              <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode">
                writing-mode
              </a>
              .
            </p>
          </SectionIntro>
          <SectionCode>
            <Alignment />
          </SectionCode>
        </OtherSection>
        <OtherSection id="limit-propagation">
          <SectionIntro>
            <h3 className="title">Limit propagation</h3>
            <p className="subtitle">
              Boundaries are good, that's what people keep saying. If you want
              some elements to scroll into view, but not all of the parents then{' '}
              <code>boundary</code> is the answer.
            </p>
            <p>Keep in mind this is a non-standard feature not in any spec.</p>
          </SectionIntro>
          <SectionCode>
            <Boundary />
          </SectionCode>
        </OtherSection>
        <OtherSection id="custom-transition">
          <SectionIntro>
            <h3 className="title">Custom transition: popmotion example</h3>
            <p className="subtitle">
              If you want a different easing, duration or another creative
              direction you can pass a function to <code>behavior</code>.
            </p>
            <p>
              Just like <code>boundary</code> this is not in the spec.
            </p>
          </SectionIntro>
          <SectionCode>
            <OverrideBehavior />
          </SectionCode>
        </OtherSection>
      </div>
      <Footer />
    </div>
  )
}

export default IndexPage
