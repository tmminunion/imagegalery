import imagemin from 'imagemin'
import imageminJpegtran from 'imagemin-jpegtran'
import type { ImageProps } from './types'

const cache = new Map<ImageProps, string>()

export default async function getBase64ImageUrl(
  image: ImageProps
): Promise<string> {
  let url = cache.get(image)
  console.log(image.imgid)
  if (url) {
    return url
  }
  const response = await fetch(
    `https://bungtemin.net/images/imgthumb/${image.imgid}/400/400`
  )
  const buffer = await response.arrayBuffer()
  const minified = await imagemin.buffer(Buffer.from(buffer), {
    plugins: [imageminJpegtran()],
  })


  url = `data:image/jpeg;base64,${Buffer.from(minified).toString('base64')}`
   
  cache.set(image, url)
  return url
}