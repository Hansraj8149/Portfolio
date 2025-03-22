import clsx from 'clsx';
import React from 'react'

interface TagProps {
  tag: string;
  className?: string
}
const Tag = ({tag, className}: TagProps) => {
  return (
    <div className={clsx("px-2 py-1 text-xs font-medium rounded bg-opacity-10 bg-primary/10 text-primary", className)}>
      {tag}
    </div>
  )
}

export default Tag
