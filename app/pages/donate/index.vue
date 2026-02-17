<template>
  <div v-if="page">
    <UPageCTA
      :title="page.title"
      :description="page.description"
      :ui="{ container: 'py-12 sm:py-16 lg:py-20' }">
      <template #links>
        <UButton
          to="https://github.com/sponsors/Reaparr"
          target="_blank"
          icon="i-simple-icons-github"
          size="xl"
          color="primary"
          variant="solid">
          Sponsor on GitHub
        </UButton>
      </template>
    </UPageCTA>

    <UPageCTA
      title="Where Your Donations Goes"
      description="All donations are used directly for the following."
      :ui="{
        container: 'py-8 sm:py-10 lg:py-12',
        title: 'text-2xl sm:text-3xl',
        description: 'text-base',
      }">
      <UPageGrid>
        <UPageCard
          v-for="benefit in benefits"
          :key="benefit.title"
          :title="benefit.title"
          :description="benefit.description"
          :icon="benefit.icon" />
      </UPageGrid>
    </UPageCTA>

    <UPageCTA
      title="Other Ways to Contribute"
      description="Not in a position to donate? There are plenty of other ways to support Reaparr — from improving docs to helping with development."
      :links="[
        {
          label: 'See how to contribute',
          to: '/docs/contributing/overview',
          color: 'primary',
          variant: 'solid',
          trailingIcon: 'i-lucide-arrow-right',
        },
      ]" />
  </div>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('donate', () =>
  queryCollection('donate').first(),
);

const benefits = [
  {
    title: 'Ongoing Development',
    description:
      'Adding new features and improvements to keep Reaparr evolving.',
    icon: 'i-lucide-code-2',
  },
  {
    title: 'AI Tooling',
    description:
      'Powering development with AI tools that significantly increase productivity but come at a high cost.',
    icon: 'i-lucide-sparkles',
  },
  {
    title: 'Bug Fixes',
    description: 'Maintaining stability and resolving issues quickly.',
    icon: 'i-lucide-bug',
  },
  {
    title: 'Infrastructure Costs',
    description: 'Covering hosting, testing environments, and tooling.',
    icon: 'i-lucide-server',
  },
  {
    title: 'Documentation',
    description: 'Keeping guides and docs accurate and up-to-date.',
    icon: 'i-lucide-book-open',
  },
  {
    title: 'Community Support',
    description: 'Responding to issues and helping users in support channels.',
    icon: 'i-lucide-users',
  },
];

const title = page.value?.seo?.title || page.value?.title;
const description = page.value?.seo?.description || page.value?.description;

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});

defineOgImageComponent('Saas');
</script>
