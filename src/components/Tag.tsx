import clsx from 'clsx';
import React from 'react'

interface TagProps {
  tag: string;
  className?: string
}
const Tag = ({tag, className}: TagProps) => {
  return (
    <span className={clsx("bg-gradient-to-r from-primary-light/10 to-emerald-500/10 text-white/90 text-xs lg:text-sm px-3 lg:px-4 py-1 lg:py-1.5 rounded border border-primary-light/20", className)}>
      {tag}
    </span>
  )
}

export default Tag
