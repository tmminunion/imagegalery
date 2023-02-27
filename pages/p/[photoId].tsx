import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Carousel from '../../components/Carousel'
import getResults from '../../utils/cachedImages'
import type { ImageProps } from '../../utils/types'

const Home: NextPage = ({ currentPhoto }: { currentPhoto: ImageProps }) => {
  const router = useRouter()
  const { photoId } = router.query
  let index = Number(photoId)

  const currentPhotoUrl = `https://bungtemin.net/news/wp-content/uploads/2023/02/6782e203b7b7c5c8de748e3798c08f2c.jpg`

  return (
    <>
      <Head>
        <title>Next.js Conf 2022 Photos</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const results = await getResults()

  let reducedResults: ImageProps[] = []
  let i = 0
  for (let result of results) {
    reducedResults.push({
      id: i,
      height: result.media_details.height,
      width: result.media_details.width,
      public_id: result.id,
      format: result.source_url,
    })
    i++
  }

  const currentPhoto = reducedResults.find(
    (img) => img.id === Number(context.params.photoId)
  )


  currentPhoto.blurDataUrl = "data:image/jpeg;base64,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"
console.log(currentPhoto)
  return {
    props: {
      currentPhoto: currentPhoto,
    },
  }
}

export async function getStaticPaths() {
 

  let fullPaths = []
 

  return {
    paths: fullPaths,
    fallback: false,
  }
}
