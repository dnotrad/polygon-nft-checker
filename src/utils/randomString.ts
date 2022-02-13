export const getRandomAddress = () => {
  const addresses = [
    '0x7488451Db91DF618759b8Af15e36F70c0FDD529E',
    '0x1e66b493e5d941116cB88C772D5dfA39639c7407',
    '0x820a615EF5419Af2b7b81D382e223CAE0feD342A',
    '0xd50a9CCf9bCb98AB79897F9C86c8A46Bd8164063',
    '0x301A8146E30e8EDA4aa9872E214af920244Cae3A',
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    '0xda9dfa130df4de4673b89022ee50ff26f6ea73cf',
    '0xbe0eb53f46cd790cd13851d5eff43d12404d33e8',
    '0x61edcdf5bb737adffe5043706e7c5bb1f1a56eea',
    '0xc098b2a3aa256d2140208c3de6543aaef5cd3a94',
    '0x07ee55aa48bb72dcc6e9d78256648910de513eca',
    '0x0548f59fee79f8832c299e01dca5c76f034f558e',
    '0x220866b1a2219f40e72f5c628b65d54268ca3a9d',
    '0x189b9cbd4aff470af2c0102f365fc1823d857965',
    '0x59448fe20378357f206880c58068f095ae63d5a5',
    '0x0c23fc0ef06716d2f8ba19bc4bed56d045581f2d',
  ];

  return addresses[Math.floor(Math.random() * addresses.length)];
};
