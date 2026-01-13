// Test if localStorage works
try {
  localStorage.setItem('test', 'value');
  const retrieved = localStorage.getItem('test');
  console.log('localStorage test:', retrieved === 'value' ? 'PASS' : 'FAIL');
  localStorage.removeItem('test');
} catch (e) {
  console.error('localStorage error:', e);
}

// Test cookies
try {
  document.cookie = "test=value; path=/; max-age=3600";
  console.log('Cookies test: SET - check browser dev tools');
} catch (e) {
  console.error('Cookie error:', e);
}
