exports.generateTransactionId=()=> {
  const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 12); // e.g., 202505101532
  const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase(); // 8-char alphanumeric
  return `TXN-${timestamp}-${randomPart}`;
}