import { Typography } from '@mui/material'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { JSXConverters, JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'

const typographyConverter: JSXConverters<DefaultNodeTypes> = {
  heading: ({ node, nodesToJSX }) => {
    return <Typography variant={node.tag}>{nodesToJSX({ nodes: node.children })}</Typography>
  },
  text: ({ node }) => {
    return (
      <Typography component="span" variant="body1">
        {node.text}
      </Typography>
    )
  },
  paragraph: ({ node, nodesToJSX }) => {
    return (
      <Typography component="p" variant="body1">
        {nodesToJSX({ nodes: node.children })}
      </Typography>
    )
  },
  // TODO: Add more converters based on requirements
}

const jsxConverter: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...typographyConverter,
})

type RichTextProps = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

const RichText = (props: RichTextProps) => {
  const { className, ...restProps } = props

  return <RichTextConverter {...restProps} className={className} converters={jsxConverter} />
}

export default RichText
