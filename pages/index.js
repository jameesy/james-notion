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
                Hey, I&apos;m James I&apos;m an Engineering Leader, currently working at {' '}
                <a href="https://askattest.com">Attest</a>
                .
              </h2>
              <h2 className='"text-md md:text-md mb-2 leading-7 text-black dark:text-gray-100"'>
                In the past I have worked in the Engineering Leadership team at {' '}
                <a href="https://monzo.com">Monzo</a>,
                as well as having a number of years of experience as a Frontend Engineer. I enjoy 
                writing, as well as eating food.
              </h2>
            </div>
          </div>
        </div>
      {postsToShow.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  )
}

export default blog
