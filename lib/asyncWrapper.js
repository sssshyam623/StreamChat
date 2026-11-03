import { AppError } from './appError';

export function asyncWrapper(handler) {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      if (error instanceof AppError) {
        return new Response(JSON.stringify({ error: error.message }), { status: error.statusCode });
      }
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  };
}
