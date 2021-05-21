import Link from 'next/link'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'

const BlogPost = ({ post }) => {
  return (
    <article key={post.id} className="mb-8 md:mb-8">
      <header className="flex flex-col justify-between md:flex-row md:items-baseline">
        <Link href={`${BLOG.path}/${post.slug}`}>
          <a>
            <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100">
              {post.title}
            </h2>
          </a>
        </Link>
      </header>
      <main>
        <p className="hidden md:block mb-2 leading-8 text-gray-500 dark:text-gray-300">
          {post.summary}
        </p>
        <time className="flex-shrink-0 text-gray-400 dark:text-gray-400">
          {formatDate(post?.date?.start_date || post.createdTime, BLOG.lang)}
        </time>
      </main>
    </article>
  )
}

export default BlogPost
