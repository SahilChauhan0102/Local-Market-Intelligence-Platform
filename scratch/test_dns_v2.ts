import dns from 'dns';
const { promises: dnsPromises } = dns;

// Set to Google DNS
dns.setServers(['8.8.8.8']);

async function testDns() {
  const hostname = '_mongodb._tcp.localgali.o7lfd2n.mongodb.net';
  console.log('Resolving SRV for:', hostname, 'using 8.8.8.8');
  try {
    const addresses = await dnsPromises.resolveSrv(hostname);
    console.log('Success:', JSON.stringify(addresses, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

testDns();
