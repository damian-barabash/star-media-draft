import { Fragment, type ReactNode } from 'react'

/**
 * Tiny rich-text markup used in content files:
 *   *gold italic*   → <em class="g">
 *   line breaks "\n" → <br>
 */
export type Segment = { text: string; em: boolean }

export function parseRich(input: string): Segment[] {
  const out: Segment[] = []
  const re = /\*([^*]+)\*/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(input))) {
    if (m.index > last) out.push({ text: input.slice(last, m.index), em: false })
    out.push({ text: m[1], em: true })
    last = m.index + m[0].length
  }
  if (last < input.length) out.push({ text: input.slice(last), em: false })
  return out
}

function withBreaks(text: string, keyBase: string): ReactNode[] {
  const lines = text.split('\n')
  return lines.flatMap((line, i) =>
    i === 0 ? [<Fragment key={`${keyBase}-${i}`}>{line}</Fragment>] : [<br key={`${keyBase}-br-${i}`} />, <Fragment key={`${keyBase}-${i}`}>{line}</Fragment>],
  )
}

export function Rich({ text }: { text: string }) {
  const segs = parseRich(text)
  return (
    <>
      {segs.map((s, i) =>
        s.em ? (
          <em className="g" key={i}>
            {withBreaks(s.text, `e${i}`)}
          </em>
        ) : (
          <Fragment key={i}>{withBreaks(s.text, `t${i}`)}</Fragment>
        ),
      )}
    </>
  )
}
