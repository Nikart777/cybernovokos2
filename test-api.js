fetch("https://cyberx-novokosino.ru/api/admin-test", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    fullName: "Test Admin",
    phone: "+79991234567"
  })
})
.then(res => res.json().then(data => ({status: res.status, data})))
.then(console.log)
.catch(console.error);
