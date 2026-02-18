const bg = 'bg-transparent ring-1 ring-white/10';

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'red',
      secondary: 'black',
      neutral: 'neutral',
    },
    main: {
      base: 'bg-stone-950/90',
    },
    pageCTA: {
      variants: {
        variant: {
          outline: {
            root: bg,
          },
        },
      },
    },
    pageCard: {
      variants: {
        variant: {
          outline: {
            root: bg,
          },
        },
      },
    },
    pageAside: {
      slots: {
        topHeader: 'bg-transparent',
        topBody: 'bg-transparent',
        topFooter: 'bg-transparent',
      },
    },
    header: {
      slots: {
        overlay: 'bg-black/90',
      },
    },
    contentSearch: {
      slots: {
        modal: 'bg-black z-99', // Ensure the search modal appears above UI
      },
    },
    prose: {
      img: {
        slots: {
          overlay: 'z-[200]',
          content: 'z-[201]',
        },
      },
    },
  },
});
