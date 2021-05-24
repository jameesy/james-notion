import Link from 'next/link'
import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import { getAllPosts } from '@/lib/notion'
import BLOG from '@/blog.config'

export async function getStaticProps() {
  let posts = await getAllPosts()
  posts = posts.filter(
    post => post.status[0] === 'Published' && post.type[0] === 'Post'
  )
  const postsToShow = posts.slice(0, BLOG.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > BLOG.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}

const blog = ({ postsToShow, page, showNext }) => {
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      <div className="space-y-16 mb-16 md:space-y-24 ">
          <div className="space-y-8 md:items-center">
            <div className="prose lg:prose-lg text-primary">
              <h2 className="text-lg leading-7 md:text-lg font-bold mb-2 text-black dark:text-gray-100">
                Hey friends &mdash; I&apos;m James. I&apos;m a software engineer and minimalist.
              </h2>
              <p className="mb-2 leading-7 text-gray-500 dark:text-gray-300">
                Currently I work as an Engineering Manager at {' '}
                <a className="px-0.5 -mx-0.5 font-bold rounded-sm text-gray-1000 dark:text-gray-300 hover:underline break-words;" href="https://askattest.com">Attest</a>,
                and in the past I have worked in the Engineering Leadership team at {' '}
                <a className="px-0.5 -mx-0.5 font-bold rounded-sm text-gray-1000 dark:text-gray-300 hover:underline break-words;" href="https://monzo.com">Monzo</a>.
                My professional focus is enabling the career progression of engineers, as well as building
                diverse, scalable and autonomous engineering teams.
              </p>
            </div>
          </div>
        </div>
      <h2 className="text-lg leading-7 mb-6 md:text-lg font-bold text-black dark:text-gray-100">My Writing</h2>
      {postsToShow.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  )
}

export default blog
