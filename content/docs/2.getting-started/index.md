---
title: Getting started
---

# Getting started

Reaparr is a cross-platform media downloader that indexes Plex servers you have access to and lets you download media directly into your own collection — fully automated, like Radarr and Sonarr.

## Reaparr variants

Two Docker image variants are available:

| Tag | Description | Command                               |
| --- | ----------- |---------------------------------------|
| [latest](https://hub.docker.com/r/reaparr/reaparr/tags?page=1&ordering=last_updated) | Stable — recommended for most users |  `docker pull reaparr/reaparr:latest` |
| [dev](https://hub.docker.com/r/reaparr/reaparr/tags?page=1&ordering=last_updated) | Development — latest changes, may be unstable | `docker pull reaparr/reaparr:dev`     |

## Prerequisites

Before installing Reaparr, make sure you have:

- A **Plex account** with access to at least one Plex server
- **Docker** installed on your system. The guides assume you already have Docker set up.

## Choose an installation method

Pick the guide that matches your setup:

| Platform | Guide |
| -------- | ----- |
| Docker (any OS) | [Docker installation](/docs/installation/docker) |
| Unraid | [Unraid installation](/docs/installation/unraid) |
| Windows | [Windows installation](/docs/installation/windows) |
| macOS | [macOS installation](/docs/installation/macos) |
| Synology | [Synology installation](/docs/installation/synology) |
