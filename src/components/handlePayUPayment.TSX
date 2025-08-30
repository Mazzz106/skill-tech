const handlePayUPayment = async () => {
  setIsProcessing(true);

  const txnid = generateTxnId();
  const amount = Math.round(getTotalPrice() * 1.18).toString();
  const productinfo = `Purchase of ${items.length} course(s)`;
  const surl = window.location.origin + '/success';
  const furl = window.location.origin + '/failure';

  const hash = await getPayUHash({
    key: PAYU_MERCHANT_KEY,
    txnid,
    amount,
    productinfo,
    firstname: paymentDetails.name,
    email: paymentDetails.email,
    salt: PAYU_SALT
  });

  // --- This part is critical ---
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = PAYU_BASE_URL;

  const fields: { [key: string]: string } = {
    key: PAYU_MERCHANT_KEY,
    txnid,
    amount,
    productinfo,
    firstname: paymentDetails.name,
    email: paymentDetails.email,
    phone: paymentDetails.phone,
    surl,
    furl,
    hash,
    service_provider: 'payu_paisa',
  };

  Object.entries(fields).forEach(([k, v]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = k;
    input.value = v;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit(); // <-- This line triggers the redirect

  setIsProcessing(false);
};