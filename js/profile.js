// ekhon ekta email dhore nilam, pore login theke asbe
const email = "a@gmail.com";

function row(icon, text) {
  return `<div class="info-row"><img src="icons/${icon}.png" alt=""><span>${text}</span></div>`;
}

fetch("data/profiles.json")
  .then(res => res.json())
  .then(profiles => {
    const user = profiles.find(p => p.email === email);

    document.getElementById("avatar").src = user.avatar;
    document.getElementById("name").textContent = user.name;
    document.getElementById("rating").textContent = `Rating: ${user.rating} ★ /5`;

    document.getElementById("job").textContent = user.job_title;
    document.getElementById("department").textContent = user.department;
    document.getElementById("organization").textContent = user.organization;
    document.getElementById("location").textContent = user.location;
    document.getElementById("email").textContent = user.email;
    document.getElementById("phone").textContent = user.phone;

    document.getElementById("working").innerHTML = user.working_on.map(w => row("working", w)).join("");
    document.getElementById("skills").innerHTML = user.skills.map(s => row("skill", s)).join("");
  });
