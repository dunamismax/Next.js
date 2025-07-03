
import { query } from '../../../../lib/db';

export async function GET() {
  const results = await query({
    query: 'SELECT * FROM posts ORDER BY published_at DESC',
    values: [],
  });
  return new Response(JSON.stringify(results), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
