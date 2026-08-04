import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

const deniedExecutableTypes = [
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'users-permissions': {
    config: {
      jwtManagement: 'refresh',
      sessions: {
        httpOnly: true,
      },
    },
  },
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('SUPABASE_STORAGE_URL'),
        s3Options: {
          credentials: {
            accessKeyId: env('SUPABASE_S3_ACCESS_KEY'),
            secretAccessKey: env('SUPABASE_S3_SECRET_KEY'),
          },
          region: env('SUPABASE_S3_REGION', 'ap-southeast-1'),
          endpoint: env('SUPABASE_S3_ENDPOINT'),
          params: {
            Bucket: env('SUPABASE_S3_BUCKET', 'strapi-uploads'),
          },
          forcePathStyle: true, // Required for Supabase S3-compatible storage
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
      security: {
        allowedTypes: allowedMediaTypes,
        deniedTypes: deniedExecutableTypes,
      },
    },
  },
});

export default config;
