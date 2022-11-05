import Link from 'next/link'
import Date from './date';
import { PostData } from '../types/postdata'
import utilStyles from '../styles/utils.module.css';

export default function Post({ title, url, created_at }: PostData) {
  return (
    <article>
      <ul className={utilStyles.list}>
        <li className={utilStyles.listItem}>
          <Link href={url}>{title}</Link>
          <br />
          <small className={utilStyles.lightText}>
            <Date dateString={created_at} />
          </small>
        </li>
      </ul>
    </article>
  )
}
