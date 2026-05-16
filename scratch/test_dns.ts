import dns from 'dns';
const { promises: dnsPromises } = dns;

async function testDns() {
  const hostname = '_mongodb._tcp.localgali.o7lfd2n.mongodb.net';
  console.log('Resolving SRV for:', hostname);
  try {
    const addresses = await dnsPromises.resolveSrv(hostname);
    console.log('Success:', JSON.stringify(addresses, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

testDns();
