---
title: Getting started
---

# Getting started

Reaparr is a cross-platform media downloader that indexes Plex servers you have access to and lets you download media directly into your own collection — fully automated, like Radarr and Sonarr.

## Prerequisites

Before installing Reaparr, make sure you have:

- A **Plex account** with access to at least one Plex server
- **Docker** installed on your system (recommended)
- A **Plex Media Server** of your own to add downloaded media to

## Choose an installation method

Pick the guide that matches your setup:

| Platform | Guide |
| -------- | ----- |
| Docker (any OS) | [Docker installation](/docs/installation/docker) |
| Unraid | [Unraid installation](/docs/installation/unraid) |
| Linux | [Linux installation](/docs/installation/linux) |
| Windows | [Windows installation](/docs/installation/windows) |
| macOS | [macOS installation](/docs/installation/macos) |
| Synology | [Synology installation](/docs/installation/synology) |

## Docker images

Two image tags are available:

| Tag | Description | Command |
| --- | ----------- | ------- |
| [latest](https://hub.docker.com/r/reaparr/reaparr/tags?page=1&ordering=last_updated) | Stable — recommended for most users | `docker pull reaparr/reaparr:latest` |
| [dev](https://hub.docker.com/r/reaparr/reaparr/tags?page=1&ordering=last_updated) | Development — latest changes, may be unstable | `docker pull reaparr/reaparr:dev` |

## After installation

Once Reaparr is running, open the web UI at `http://localhost:7000` and:

1. Add your Plex credentials so Reaparr can index servers you have access to
2. Connect your own Plex Media Server as the download destination
3. Integrate with [Sonarr / Radarr](/docs/integration/sonarr-radarr) for fully automated media management

## Next steps

- [Integration with Sonarr & Radarr](/docs/integration/sonarr-radarr)
- [FAQ](/docs/faq)
- [Troubleshooting](/docs/troubleshooting)
