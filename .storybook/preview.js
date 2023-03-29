export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // controls: {
  //   expanded: true // 展开所有参数信息
  // },
  // docs:{page:null}
}
