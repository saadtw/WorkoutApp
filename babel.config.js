module.exports = function(api) {
  api.cache(true); // Enables caching for faster builds
  return {
    presets: ['babel-preset-expo'], // This preset is used for Expo projects
  };
};
