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
    pageAside: {
      slots: {
        topHeader: 'bg-transparent',
        topBody: 'bg-transparent',
        topFooter: 'bg-transparent',
      },
    },
    contentSearch: {
      slots: {
        modal: 'z-99', // Ensure the search modal appears above UI
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
