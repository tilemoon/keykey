import { FC, useEffect, useMemo, useState } from "react";
import { css } from '@emotion/css'
import { KeyKeyTheme, useTheme } from '../theme'
import { onKeydown } from '../events'

export enum KeyWidth {
  w0 = 72,
  w1 = 84,
  w2 = 98,
  w3 = 128,
  wSpace = 312,
}

interface KeyProps {
  code: string
  textPosition?: 'cc' | 'ct' | 'cl' | 'cr' | 'cb' | 'lb' | 'rb'
  fontSize?: number
  width?: number
  height?: number
  style?: React.CSSProperties
  children?: React.ReactNode
}

const Key: FC<KeyProps> = ({
  code,
  textPosition = 'cc',
  fontSize = 14,
  height = 54,
  width = 54,
  style,
  children,
}) => {
  const { theme } = useTheme<KeyKeyTheme>()
  const [highlightCss, setHighlightCss] = useState('')

  const textPositionCss = useMemo<string>(() => {
    switch(textPosition) {
      case 'cc':
        return `align-items: center; justify-content: center;`;
      case 'cl':
        return 'justify-content: center;';
      case 'cr':
        return 'align-items: flex-end; justify-content: center;';
      case 'cb':
        return 'align-items: center; justify-content: flex-end;';
      case 'lb':
        return 'justify-content: flex-end;';
      case 'rb':
        return 'align-items: flex-end; justify-content: flex-end;';
    }
    return ''
  }, [textPosition])

  const highlight = (color: string) => {
    setHighlightCss(`
      background-color: ${color};
    `)

    setTimeout(() => {
      setHighlightCss(`
        transition: background-color 3s;
        background-color: unset;
      `)
    }, 200)
  }

  useEffect(() => {
    onKeydown(e => {
      if (e.code == code) {
        highlight(theme.colors.keyPressed)
      }
    })
  }, [code])

  return <div style={style} className={css`
    font-size: ${fontSize}px;
    color: ${theme.colors.keyFont};
    border: 1px solid ${theme.colors.keyBorder};
    height: ${height}px;
    width: ${width}px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 4px;
    ${highlightCss}
    ${textPositionCss}
  `}>
    {children}
  </div>
}

export default Key