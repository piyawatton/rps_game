import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';


export function withAuth(
  handler: NextApiHandler
): NextApiHandler {
  return (req, res) => {
    if (req.headers.authorization) {
      handler(req, res)
    }
    return res.json({
      success: false,
      message: 'Unauthorize',
    })
  }
}

export function withMethod(
  handler: NextApiHandler,
  methods: string[],
): NextApiHandler {
  return (req, res) => {
    if (methods.includes(req.method || '')) {
      handler(req, res)
    }
    return res.json({
      success: false,
      message: 'Method not allow',
    })
  }
}



