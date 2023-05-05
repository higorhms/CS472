function calcTip() {
  const subtotal = document.getElementById("subtotal").value;
  const tip = document.getElementById("tip").value;
  document.getElementById("total").textContent = +subtotal + (subtotal * (tip / 100));
}