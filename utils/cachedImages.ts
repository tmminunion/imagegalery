

let cachedResults

export default async function getResults() {
  if (!cachedResults) {
    const res = await fetch("https://bungtemin.net/images/api")
   const dodol = res.json()
    cachedResults = dodol
  }

  return cachedResults
}
