import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Posts from './collections/Posts';
import Tags from './collections/Tags';
import Projects from './collections/Projects';
import Technologies from './collections/Technologies';
import Media from './collections/Media';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Posts, Tags, Projects, Technologies, Media],
  editor: slateEditor({}),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
  }),
});
