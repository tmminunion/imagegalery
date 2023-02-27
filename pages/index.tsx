import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Bridge from '../components/Icons/Bridge'
import Logo from '../components/Icons/Logo'
import Modal from '../components/Modal'

import type { ImageProps } from '../utils/types'
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'

async function getdata(page:number) {
  
   const res = await fetch(`https://bungtemin.net/images/api`)
   const dodol = res.json()

return dodol;
 }


const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter()
  const { photoId } = router.query
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)
console.log(router.query.page)
  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])

  return (
    <>
      <Head>
        <title>Galerry Photo</title>
        <meta
          property="og:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId)
            }}
          />
        )}
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="flex max-h-full max-w-full items-center justify-center">
                <Bridge />
              </span>
              <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
            </div>
            <Logo />
            <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
              2022 Event Photos
            </h1>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
              galerry photo dari bungtemin
            </p>
            <a
              className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
              href="https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-cloudinary&project-name=nextjs-image-gallery&repository-name=with-cloudinary&env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUDINARY_FOLDER&envDescription=API%20Keys%20from%20Cloudinary%20needed%20to%20run%20this%20application"
              target="_blank"
              rel="noreferrer"
            >
              Clone and Deploy
            </a>
          </div>
          {images.map(({ id, format, }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt="Next.js Conf photo"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,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"
                src={`${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))}
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        Thank you to{' '}
        <a
          href="https://edelsonphotography.com/"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Josh Edelson
        </a>
        ,{' '}
        <a
          href="https://www.newrevmedia.com/"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Jenny Morgan
        </a>
        , and{' '}
        <a
          href="https://www.garysextonphotography.com/"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Gary Sexton
        </a>{' '}
        for the pictures.
      </footer>
    </>
  )
}

export default Home

export async function getStaticProps(context) {
  const { params } = context
  
  let reducedResults: ImageProps[] = []
  const results = await getdata(2)

  let i = 0
    for (let result of results.image) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.id,
      format: result.filepath,
    })
    i++
  }

  return {
    props: {
      images: reducedResults,
    },
  }
}
