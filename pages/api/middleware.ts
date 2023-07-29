import { detachToken } from '@/src/services/users';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';


export function withAuth(
  handler: NextApiHandler
): NextApiHandler {
  return (req, res) => {
    try {
      if (req.headers.authorization) {
        const jwtData = detachToken(req.headers.authorization || '');
        return handler(req, res)
      }
      return res.json({
        success: false,
        message: 'Unauthorize',
      })
    } catch (e) {
      console.log('withAuth : error', e);
      return res.json({
        success: false,
        message: 'Invalid token',
      })
    }
  }
}

export function withMethod(
  handler: NextApiHandler,
  methods: string[],
): NextApiHandler {
  return (req, res) => {
    try {
      if (methods.includes(req.method || '')) {
        return handler(req, res)
      }
      return res.json({
        success: false,
        message: 'Method not allow',
      })
    } catch (e) {
      console.log('withMethod : error', e);
      return res.json({
        success: false,
        message: 'Internal error',
      })
    }
  }
}



