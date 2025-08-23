<template>
  <GridContainer justify="center">
    <GridColumn
      v-for="(link, index) in shields"
      :key="index"
      col="auto"
      class="m-2">
      <img
        :height="height"
        :src="link.src"
        :alt="link.label">
    </GridColumn>
  </GridContainer>
  <GridContainer justify="center">
    <GridColumn col="auto">
      <table>
        <thead>
          <tr>
            <th class="text-left">
              <h3>
                Development
              </h3>
            </th>
            <th class="text-left">
              <h3>
                Stable
              </h3>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(_, index) in Math.max(devShields.length, stableShields.length)"
            :key="index">
            <td v-if="devShields[index]">
              <img
                class="mt-2"
                :height="height"
                :src="devShields[index].src"
                :alt="devShields[index].label">
            </td>
            <td v-if="stableShields[index]">
              <img
                class="mt-2"
                :height="height"
                :src="stableShields[index].src"
                :alt="stableShields[index].label">
            </td>
          </tr>
        </tbody>
      </table>
    </GridColumn>
  </GridContainer>
</template>

<script setup lang="ts">
import { transform } from '~/common/lib/shields-parser';

const height = ref(32);

const shields = transform([
  {
    label: 'Docker Pulls',
    src: 'https://img.shields.io/docker/pulls/reaparr/reaparr',
  },
  {
    label: 'Github Followers',
    src: 'https://img.shields.io/github/followers/reaparr',
  },
  {
    label: 'Github Watchers',
    src: 'https://img.shields.io/github/watchers/Reaparr/Reaparr',
  },
  {
    label: 'Github Forks',
    src: 'https://img.shields.io/github/forks/Reaparr/Reaparr',
  },
  {
    label: 'Github Stars',
    src: 'https://img.shields.io/github/stars/Reaparr',
  },
  {
    label: 'Docker Stars',
    src: 'https://img.shields.io/docker/stars/reaparr/reaparr',
  },
  {
    label: 'GitHub issues',
    src: 'https://img.shields.io/github/issues/reaparr/reaparr',
  },
  {
    label: 'Created At',
    src: 'https://img.shields.io/github/created-at/reaparr/reaparr',
  },
  {
    label: 'License',
    src: 'https://img.shields.io/github/license/reaparr/reaparr',
  },
]);

const devShields = transform([
  {
    label: 'Development Version',
    fileName: 'src/WebAPI/ClientApp/package.json',
    src: 'https://img.shields.io/github/package-json/v/Reaparr/Reaparr/dev',
  },
  {
    label: 'Reaparr Dev Image Size',
    src: 'https://img.shields.io/docker/image-size/reaparr/reaparr/dev',
  },
  {
    label: 'Last Commit on Dev Branch',
    src: 'https://img.shields.io/github/last-commit/Reaparr/Reaparr/dev',
  },
  {
    label: 'Commits since last release on Dev Branch',
    src: 'https://img.shields.io/github/commits-since/reaparr/reaparr/latest',
  },
]);

const stableShields = transform([
  {
    label: 'Stable Version',
    fileName: 'src/WebAPI/ClientApp/package.json',
    src: 'https://img.shields.io/github/package-json/v/Reaparr/Reaparr',
  },
  {
    label: 'Reaparr Latest Image Size',
    src: 'https://img.shields.io/docker/image-size/reaparr/reaparr/latest',
  },
  {
    label: 'Last Release',
    src: 'https://img.shields.io/github/release-date/reaparr/reaparr',
  },
  {
    label: 'Contributors',
    src: 'https://img.shields.io/github/contributors/reaparr/reaparr',
  },
]);
</script>
