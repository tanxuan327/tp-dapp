import SignClient from '@walletconnect/sign-client';

const projectId = '6e5e0ad7ffa9d4311442b0143abebc60';

document.getElementById('connectBtn').addEventListener('click', async () => {
  const signClient = await SignClient.init({
    projectId,
    metadata: {
      name: 'My TRON DApp',
      description: 'TRON 钱包连接演示',
      url: 'https://your-vercel-project.vercel.app',
      icons: ['https://your-vercel-project.vercel.app/icon.png'],
    }
  });

  const { uri, approval } = await signClient.connect({
    requiredNamespaces: {
      tron: {
        methods: [
          'tron_signTransaction',
          'tron_sendRawTransaction',
          'tron_signMessage'
        ],
        chains: ['tron:mainnet'],
        events: ['accountsChanged', 'chainChanged']
      }
    }
  });

  // 跳转 TP 钱包连接
  if (uri) {
    const tpUrl = `tpoutside://wc?uri=${encodeURIComponent(uri)}`;
    window.location.href = tpUrl;
  }

  const session = await approval();
  const account = session.namespaces.tron.accounts[0]; // tron:mainnet:T...
  const address = account.split(':')[2];
  document.getElementById('walletAddress').innerText = address;
});
