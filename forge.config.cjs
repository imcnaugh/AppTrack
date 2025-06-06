const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    name: 'App Track',
    icon: './img/icon',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: 'https://getapptrack.com/icon.ico',
        setupIcon: './img/icon.ico',
      }
    },
    {
      name: '@electron-forge/maker-dmg',
      icon: './img/icon.icns',
      format: 'ULFO',
      platforms: ['darwin'],
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: './webpack.main.config.cjs',
        renderer: {
          config: './webpack.render.config.cjs',
          entryPoints: [{
            name: 'main_window',
            html: './src/html/index.html',
            js: './src/js/render/main-window/renderer.js',
            preload: {
              js: './src/js/render/main-window/preload.js'
            }
          }]
        }
      }
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Caffeine-Driven-Development-LLC',
          name: 'AppTrack'
        },
        prerelease: false
      }
    }
  ],
};
