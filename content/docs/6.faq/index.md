---
title: Frequently Asked Questions
description: Find answers to common questions about Reaparr, including installation, Plex account setup, troubleshooting, and how to support the project. If you have a question that isn't answered here, please check the documentation or ask in the community.
seo:
  title: Frequently Asked Questions | Reaparr Docs
  description: Answers to common Reaparr questions covering installation, Plex account setup, troubleshooting, browser support, and how to support the project.
---

## Getting Started

::faq-accordion
---
items:
  - label: Which platforms are supported for installation?
    slot: platforms
    value: platforms
  - label: What is the default username and password to log into Reaparr?
    slot: default-creds
    value: default-creds
  - label: What if I forgot my username and password to log into Reaparr?
    slot: forgot-creds
    value: forgot-creds
  - label: What happened to the name "PlexRipper"? Why is it now "Reaparr"?
    slot: name-change
    value: name-change
  - label: How is Reaparr spelled?
    slot: spelling
    value: spelling
  - label: What is the difference between Reaparr stable and dev?
    slot: stable-dev
    value: stable-dev
---

#platforms
- [Docker](/docs/installation/docker)
- [Unraid](/docs/installation/unraid)
- [Windows](/docs/installation/windows)
- [macOS](/docs/installation/macos)
- [Synology](/docs/installation/synology)

#default-creds
**Make sure to change this as soon as you log in!**

Username: `ReaparrRocks`

Password: `R€Aℙℙ@rr69`

#forgot-creds
1. Shutdown Reaparr
2. Open `/Config/ReaparrSettings.json` in a text editor
3. Change `ResetCredentials` to `true`
4. Start Reaparr again, and you will be able to log in with the default username and password

#name-change
We received a trademark complaint from Plex Inc., so we had to change the name.

The new name, Reaparr, is a play on "Reaper" (as in the Grim Reaper), with an extra arr to match the naming style of projects like Sonarr and Radarr. 

We chose it because:
- It avoids trademark issues and is more future-proof.
- "Reap" fits the idea of collecting/harvesting media, while keeping a subtle edge.
- It aligns with the "arr" ecosystem we plan to integrate with.

#spelling
Ah yes, the main question in life. Even I, as its almighty creator, am not too sure. But in my infinite, most likely misspelling, wisdom have settled on "Reaparr".

#stable-dev
The dev branch contains all the latest under development changes.

::

## Plex Account & Authentication

::faq-accordion
---
items:
  - label: I tried to use my username to set up my Plex account in Reaparr, but it's not working?
    slot: username-setup
    value: username-setup
  - label: How do I get my Plex account auth token and use it in Reaparr?
    slot: auth-token
    value: auth-token
  - label: Is Reaparr detectable by Plex server owners?
    slot: detectable
    value: detectable
  - label: Will Plex ban my account for the use of Reaparr?
    slot: ban-risk
    value: ban-risk
---

#username-setup
Make sure that the "Allow username to be used when signing in" is checked.

1. Go to [plex.tv](https://www.plex.tv/) and sign-in
2. Go to Settings -> Account
3. Click on the username and the below option will appear
4. Make sure it's checked and then click "Save Changes"

![Username Plex Question](/img/faq/username-plex-question.png){.responsive-img}

#auth-token
Use Plex's official method:

1. Sign in to [Plex Web](https://app.plex.tv/).
2. Open a library and click a movie or show.
3. Open the item menu and choose "View XML" (i.e., view the XML for the item).
4. In the URL, copy the value after `X-Plex-Token=` (stop before the next `&`).

This follows Plex's guide: [Finding an authentication token / X-Plex-Token](https://support.plex.tv/articles/204059436-finding-an-authentication-token-x-plex-token/).

**Note: This does not create a new token; it reveals an existing account token.**

Reaparr method if you want to create a new token to share:

1. Add your Plex account in Reaparr using your username and password,
2. Open that Plex account in Reaparr.
3. Click "Generate Token" to create a new token you can share.

#detectable
Yes and no.

Yes, in the sense that they can always cross-reference the IP connecting to the server which is using a lot of bandwidth with a PlexAccount that has access to their server.

No, in the sense that programs such as Tautalli, etc. will not trigger.

Take this with a grain of salt, as this might change at any moment and please make an issue if you are aware of some vulnerability in Reaparr.

#ban-risk
Most likely not, but I do not own Plex, so I can't give guarantees. If you want to be extra safe then make a dummy account, and then use that account to request access to various Plex servers. Your real account will then never be exposed to a Plex server its downloading from.

::

## Troubleshooting

::faq-accordion
---
items:
  - label: I'm getting "Permission denied" or "Access to the path is denied" errors when downloading files. How do I fix this?
    slot: permission-denied
    value: permission-denied
  - label: Why are the poster images not showing when viewing a Plex library?
    slot: no-images
    value: no-images
  - label: Which browsers are supported by Reaparr?
    slot: browsers
    value: browsers
  - label: The background of Reaparr is dark gray, is that normal?
    slot: dark-background
    value: dark-background
  - label: Where can I find the log files?
    slot: log-files
    value: log-files
  - label: Where does Reaparr store its configuration and data?
    slot: config-location
    value: config-location
---

#permission-denied
This is typically a file permission issue with your mounted download directory. Reaparr runs as a specific user inside the Docker container and needs proper permissions to write to your host's file system.

**Solution:** Set the correct PUID and PGID environment variables in your Docker configuration.

1. Find your user's PUID and PGID by running this command on your host system:
   ```bash
   id username
   ```
   Replace `username` with your actual username. This will output something like `uid=1000(username) gid=1000(groupname)`.

2. Add these environment variables to your Docker configuration:
   - **Docker Compose:** Add to your `environment:` section:
     ```yaml
     environment:
       - PUID=1000
       - PGID=1000
     ```
   - **Unraid:** Set these variables in the Unraid template editor (usually pre-configured, but verify they match your user).
   - **Docker CLI:** Add `-e PUID=1000 -e PGID=1000` flags to your `docker run` command.

3. **Verify folder permissions:** Ensure the mounted directories (especially your download path) have read/write permissions for the user/group you specified:
   ```bash
   sudo chown -R 1000:1000 /path/to/your/download/folder
   sudo chmod -R 755 /path/to/your/download/folder
   ```
   Replace `1000:1000` with your PUID:PGID and `/path/to/your/download/folder` with your actual download directory path.

4. Restart the container after making these changes.

This ensures Reaparr runs with the same permissions as your user, allowing it to read and write files in mounted directories. For more details, see the [Linux Server documentation on PUID and PGID](https://docs.linuxserver.io/general/understanding-puid-and-pgid/#using-the-variables).

#no-images
- Make sure the server is online, images are loaded directly from the Plex server.
- Make sure you disable ad blockers like [uBlock Origin](https://ublockorigin.com/).
- Make sure to disable extensions like Dark Reader.
- Firefox can sometimes block non-https connections. Press F12 in Firefox and watch the console to verify this.

#browsers
Officially, all chromium based browsers such as [Google Chrome](https://www.google.com/chrome/) and [Ungoogled Chromium](https://github.com/ungoogled-software/ungoogled-chromium) and Firefox.

[Brave](https://brave.com/) works as well, just disable the Brave shields functionality on Reaparr. See this [issue](https://github.com/brave/brave-browser/issues/19037#issuecomment-1287769602).

It "should" however work with all browsers, except ancient ones like Internet Explorer and trash ones like Safari. Don't expect support for either of those.

#dark-background
No it should be almost the same background you see on this website. Make sure you're not running an extensions such as [Dark Reader](https://chrome.google.com/webstore/detail/dark-reader/eimadpbcbfnmbkopoojfekhnkhdbieeh?hl=en) that makes the websites you visit dark

#log-files
Logs are stored in mounted Docker volume `/Config/Logs`.

#config-location
- Inside the app data directory (container path is `/Config`).
- When using Docker, map a host folder to `/Config` to persist settings, database, and logs across updates.

::

## Community & Support

::faq-accordion
---
items:
  - label: How can I help?
    slot: how-to-help
    value: how-to-help
  - label: How can I show my appreciation?
    slot: appreciation
    value: appreciation
  - label: How can I donate?
    slot: donate
    value: donate
  - label: How do I report a bug or request a feature?
    slot: bug-report
    value: bug-report
  - label: Is this project dead? Why no updates? Can you hurry up?
    slot: project-status
    value: project-status
  - label: I'm impressed with your work, can I hire you?
    slot: hire
    value: hire
---

#how-to-help
Check the [Contributing page](/docs/contributing/overview) to see what you can do to help!

#appreciation
The rising number of GitHub stars, docker pulls and users going out of their way to make bug reports and give feedback is already the biggest honor for me.

- You can give a star on the GitHub pages for [Reaparr](https://github.com/Reaparr/Reaparr) and [Docs](https://github.com/Reaparr/Docs).
- You can give a star on the Docker page for [Reaparr](https://hub.docker.com/r/reaparr/reaparr/).

#donate
GitHub Sponsors is available:

- Use the GitHub Sponsors page: [github.com/sponsors/Reaparr](https://github.com/sponsors/Reaparr)
- Click the "Sponsor" button on the [Reaparr](https://github.com/Reaparr/Reaparr) repo to make a one‑time or monthly contribution.

Other ways to support:

- Star the GitHub repos: [Reaparr](https://github.com/Reaparr/Reaparr) and [Docs](https://github.com/Reaparr/Docs)
- Contribute code/docs, report bugs, or suggest features
- Join the [Discord](https://discord.com/invite/Qa3BtxN77g) and spread the word

#bug-report
- Open an issue on GitHub: [Reaparr Issues](https://github.com/Reaparr/Reaparr/issues)
- Include steps to reproduce, expected vs actual behavior, and relevant logs/screenshots.
- You can also discuss first in the community [Discord](https://discord.com/invite/Qa3BtxN77g).

#project-status
Check the [homepage](/) for what is currently happening or join the [discord](https://discord.com/invite/Qa3BtxN77g) so you can complain there about this FREE labour of love.

#hire
Yes, I ([JasonLandbridge](https://github.com/JasonLandbridge)) work as a freelance Vue.js/.NET developer, and I'm always looking forward to the next awesome project. But if you're secretly hoping for more updates on Reaparr, then you might not want to hire me ;-)

::


