const form = document.getElementById("codeForm");
const input = document.getElementById("codeInput");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const code = input.value.replace(/\D/g, "").slice(0, 6);
  input.value = code;
  if (code.length !== 6) {
    message.textContent = "Digite os 6 números do código.";
    message.className = "error";
    return;
  }
  try {
    message.textContent = "Conferindo código...";
    message.className = "";
    const response = await fetch(`session.json?t=${Date.now()}`, { cache: "no-store" });
    const session = await response.json();
    const expired = session.expires_at && Math.floor(Date.now() / 1000) > session.expires_at;
    if (!session.active || expired || session.code !== code || !session.url) {
      message.textContent = "Código inválido ou transmissão encerrada.";
      message.className = "error";
      return;
    }
    window.location.href = `${session.url}/tv`;
  } catch {
    message.textContent = "Não foi possível consultar a sessão.";
    message.className = "error";
  }
});
