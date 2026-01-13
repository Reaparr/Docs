<template>
  <Page>
    <h1>Frequently Asked Questions</h1>

    <Accordion
      :value="activePanel"
      :dt="styling"
      class="w-full"
      @update:value="onPanelChange">
      <AccordionPanel
        v-for="(question, index) in questions"
        :id="kebabCase(question.title)"
        :key="index"
        :value="kebabCase(question.title)">
        <AccordionHeader>{{ question.title }}</AccordionHeader>
        <AccordionContent v-if="question.answer">
          <ContentRenderer :value="question.answer" />
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </Page>
</template>

<script lang="ts" setup>
import type { MarkdownNode, MarkdownParsedContent } from '@nuxt/content';
import { kebabCase } from 'lodash-es';
import { queryContent, useHead, useRoute, useRouter, useNuxtApp } from '#imports';

interface Question {
  title: string;
  answer: MarkdownParsedContent;
}

useHead({
  title: 'Frequently Asked Questions',
});

const nuxtApp = useNuxtApp();
const router = useRouter();
const route = useRoute();
const activePanel = ref<string | string[] | null | undefined >(null);
const currentPage = await queryContent('faq').findOne() as MarkdownParsedContent;
const questions = parseQuestions();
const styling = ref({
  colorScheme: {
    light: {
      root: {
        headerBackground: '{surface.400}',
        contentBackground: '{surface.400}',
      },
    },
    dark: {
      root: {
        headerColor: '{surface.0}',
        headerBackground: '{surface.400}',
        contentBackground: '{transparent}',
        headerHoverBackground: '{surface.600}',
        headerActiveBackground: '{surface.600}',
        headerActiveHoverBackground: '{surface.600}',
        transitionDuration: '0.3s',
      },
    },
  },
});

function parseQuestions() {
  if (!currentPage) {
    return [];
  }
  const children = currentPage?.body.children ?? [];
  if (!children) {
    return [];
  }
  const questionIndices = [];
  // Remove FAQ title
  children.splice(0, 1);
  // Retrieve all questions tagged with h2 tag
  for (let i = 0; i < children.length - 1; i++) {
    if (children[i]?.tag === 'h2') {
      questionIndices.push(i);
    }
  }

  // Retrieve all the answers between the questions and map them
  const result: Question[] = [];
  const lastIndex = children.length - 1;
  for (let i = 0; i < questionIndices.length; i++) {
    const questionIndex = questionIndices[i];
    const parent = children[questionIndex];
    if (!parent.children) {
      continue;
    }

    const title = parent.children[0].value ?? 'Title not found';
    let answerChildren: MarkdownNode[] = [];

    if (i < lastIndex) {
      const nextQuestionIndex = questionIndices[i + 1];
      answerChildren = children.slice(questionIndex + 1, nextQuestionIndex);
    } else {
      answerChildren = children.slice(questionIndex + 1, lastIndex + 1);
    }

    result.push({
      title,
      answer: {
        ...currentPage,
        body: {
          type: 'root',
          children: answerChildren,
        },
      },
    });
  }

  return result;
}

function onPanelChange(event: string | string[] | null | undefined) {
  if (typeof event === 'string') {
    activePanel.value = event;
    router.replace({ hash: '#' + event });
  }
}

nuxtApp.hook('page:finish', () => {
  if (route.hash) {
    const panelId = route.hash.replace('#', '');
    activePanel.value = panelId;
    setTimeout(() => {
      const pageContainerElement = document.getElementById('page-container');
      if (!pageContainerElement) {
        return;
      }

      const targetElement = document.getElementById(panelId);
      if (!targetElement) {
        return;
      }
      const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;

      if (targetElement) {
        const offset = 20; // Adjust for a header or spacing

        pageContainerElement.scrollTo({
          top: elementTop - offset,
          behavior: 'smooth',
        });
      }
    }, 1000);
  }
});
</script>

<style lang="scss">
.p-accordioncontent {
  background-color: var(--p-surface-400);
}

.p-accordionpanel-active {
  margin-top: 1rem;
  margin-bottom: 1rem;
  transition: all 0.3s;
}
</style>
