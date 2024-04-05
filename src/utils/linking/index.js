/* eslint-disable prettier/prettier */
const config = {
  screens: {
    HomeStackScreen: {
      screens: {
        HomeScreen: {
          path: 'posts',
        },
        CommentsScreen: {
          path: 'posts/:postId',
          parse: {
            postId: postId => `${postId}`,
          },
        },
      },
    },
  },
};

const linking = {
  prefixes: ['https://sweets'],
  config,
};

export default linking;
