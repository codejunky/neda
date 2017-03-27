const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://test:test@ds157509.mlab.com:57509/nedatest',
  port: process.env.PORT || 3000,
};

export default config;
