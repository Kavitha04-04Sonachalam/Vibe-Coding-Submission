// Simple UPI deep-link generator and SMS-confirmation simulator
(function(){
  const payBtn = document.getElementById('payBtn');
  const intentBtn = document.getElementById('intentBtn');
  const statusEl = document.getElementById('status');
  const amountEl = document.getElementById('amount');
  const upiIdEl = document.getElementById('upiId');
  const payeeNameEl = document.getElementById('payeeName');

  function setStatus(text){ statusEl.textContent = 'Status: ' + text }

  function formatAmount(a){
    // ensure two decimal places
    return Number(a).toFixed(2);
  }

  function buildUpiLink({pa, pn, am, tn}){
    // upi://pay?pa=merchant@bank&pn=MerchantName&am=10.00&cu=INR&tn=ORDER12345
    const params = new URLSearchParams({pa, pn, am: formatAmount(am), cu: 'INR'});
    if(tn) params.set('tn', tn);
    return 'upi://pay?' + params.toString();
  }

  payBtn.addEventListener('click', ()=>{
    const pa = upiIdEl.value.trim();
    const pn = payeeNameEl.value.trim();
    const am = amountEl.textContent.trim() || '1.00';
    if(!pa){ setStatus('Missing UPI ID'); return }
    const tn = 'ORDER' + Date.now();
    const upi = buildUpiLink({pa,pn,am,tn});
    setStatus('Opening UPI app...');
    // On mobile this will open the UPI app. On desktop nothing may happen.
    window.location.href = upi;
    // In many browsers, navigation may be blocked. For testing, show a clickable link.
    setTimeout(()=>{
      setStatus('If UPI app did not open, copy this link: ' + upi);
      // reveal an alert so user can copy on desktop
      if(!/Android|iPhone|iPad/i.test(navigator.userAgent)){
        alert('UPI link:\n' + upi + '\n\nCopy and open it on your phone to test the payment.');
      }
    },700);
  });

  // Intent-style open for Android (some browsers support it)
  intentBtn.addEventListener('click', ()=>{
    const pa = upiIdEl.value.trim();
    const pn = payeeNameEl.value.trim();
    const am = amountEl.textContent.trim() || '1.00';
    if(!pa){ setStatus('Missing UPI ID'); return }
    const tn = 'ORDER' + Date.now();
    const upi = buildUpiLink({pa,pn,am,tn});
    // Build an intent fallback: tries to open a native app, otherwise opens Play Store
    const intent = 'intent://pay?'+ new URLSearchParams({pa,pn,am,cu:'INR',tn}).toString() + '#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end';
    setStatus('Opening intent...');
    window.location.href = intent;
  });

  // SMS parsing / simulation helpers
  const parseSmsBtn = document.getElementById('parseSmsBtn');
  const simulateSmsBtn = document.getElementById('simulateSmsBtn');
  const smsInput = document.getElementById('smsText');
  const manualConfirm = document.getElementById('manualConfirm');

  function parseSms(text){
    // Basic heuristics to detect UPI credit messages
    // Examples:
    // "Your a/c XXXXX credited with INR 1.00 on ... Ref: TXN12345. UPI payment successful"
    const lower = text.toLowerCase();
    const successKeywords = ['credited','upi','success','payment successful','txn','credited with'];
    const isSuccess = successKeywords.some(k=> lower.includes(k));
    const amountMatch = text.match(/inr\s?([0-9]+(?:\.[0-9]{1,2})?)/i) || text.match(/rs\.\s?([0-9]+(?:\.[0-9]{1,2})?)/i) || text.match(/credited with\s?([0-9]+(?:\.[0-9]{1,2})?)/i);
    const txnMatch = text.match(/ref[:\s-]*([A-Z0-9-_]+)/i) || text.match(/txn[:\s-]*([A-Z0-9-_]+)/i);
    return {isSuccess, amount: amountMatch ? amountMatch[1] : null, txn: txnMatch ? txnMatch[1] : null};
  }

  parseSmsBtn.addEventListener('click', ()=>{
    const text = smsInput.value.trim();
    if(!text){ setStatus('No SMS text to parse'); return }
    const parsed = parseSms(text);
    if(parsed.isSuccess){
      setStatus('Payment detected via SMS. Amount: INR ' + (parsed.amount||'?') + (parsed.txn ? ', TXN: '+parsed.txn : ''));
    } else {
      setStatus('No definitive payment pattern found in SMS.');
    }
  });

  simulateSmsBtn.addEventListener('click', ()=>{
    // Simulate receiving a real UPI credit SMS for INR 1
    const simulated = 'Your a/c XXXXX credited with INR 1.00 on 21-Oct-2025. Ref: TXN' + Math.floor(Math.random()*90000+10000) + '. UPI payment successful.';
    smsInput.value = simulated;
    const parsed = parseSms(simulated);
    setStatus('Simulated SMS parsed: ' + (parsed.isSuccess ? ('Payment OK — INR ' + parsed.amount + (parsed.txn?(', TXN '+parsed.txn):'')) : 'No match'));
  });

  manualConfirm.addEventListener('click', ()=>{
    setStatus('Manually marked as paid — for testing only');
  });

})();
