
import { query } from '../../../../../lib/db';

export async function GET(request, { params }) {
  const { id } = params;
  const results = await query({
    query: 'SELECT * FROM projects WHERE id = ?',
    values: [id],
  });
  return new Response(JSON.stringify(results[0]), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
