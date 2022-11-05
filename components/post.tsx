import Link from 'next/link'
import { PostData } from '../types/postdata'

export default function Post({ title, url }: PostData) {
  return (
    <article>
      <h2>{title}</h2>
      <Link href={url}>Read more...</Link>
    </article>
  )
}
