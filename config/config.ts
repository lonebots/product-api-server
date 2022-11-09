export default {
  port: 3000,
  host: "localhost",
  dbUri: "update_your_db_uri",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
  blah....blah...blah --> update with your private key
  -----END CERTIFICATE-----`,
};
