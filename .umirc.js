// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  history: 'hash',
  publicPath: './',
  outputPath: './chrome-extension/dist',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true,
      },
      dynamicImport: false,
      title: 'jsonToGo',
      dll: false,

      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
        ],
      },
    }],
  ],
  routes: [
    {
      path: '/',
      redirect: '/json',
    },
    {
      path: '/json',
      component: 'Index',
      exact: true,
    },
    {
      path: '/yaml',
      component: 'Index',
      exact: true,
    },
    {
      path: '/mysql',
      component: 'Index',
      exact: true,
    },
  ],
};
