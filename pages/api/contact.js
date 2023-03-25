// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default function handler(req, res) {
  if (req.method === 'POST') {
    // handle POST request
    console.log('Handling POST request')
    res.status(200).json({ message: 'Form submission successful!' })
  } else {
    // handle other methods
    res.status(405).json({ message: 'Method not allowed' })
  }
}
