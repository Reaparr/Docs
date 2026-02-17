import { defineCollection } from '@nuxt/content';

export const collections = {
  docs: defineCollection({
    source: 'docs/**/*',
    type: 'page',
  }),
  credits: defineCollection({
    source: 'credits/**/*',
    type: 'page',
  }),
  donate: defineCollection({
    source: 'donate/**/*',
    type: 'page',
  }),
};
