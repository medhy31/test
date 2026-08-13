// FAQ accordion
document.querySelectorAll(".faq-item").forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
      openItem.querySelector(".faq-answer").style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// Diagnostic multi-step form
(function () {
  const box = document.querySelector(".diagnostic-box");
  if (!box) return;

  const form = document.getElementById("diagnostic-form");
  const steps = Array.from(box.querySelectorAll(".diagnostic-step"));
  const progressDots = Array.from(box.querySelectorAll(".diagnostic-progress span"));
  const success = box.querySelector(".diagnostic-success");
  const answers = {};
  let current = 1;

  function goToStep(stepNum) {
    steps.forEach((step) => {
      step.classList.toggle("active", Number(step.dataset.step) === stepNum);
    });
    progressDots.forEach((dot) => {
      dot.classList.toggle("done", Number(dot.dataset.step) <= stepNum);
    });
    current = stepNum;
  }

  box.querySelectorAll("[data-field]").forEach((group) => {
    const field = group.dataset.field;
    group.querySelectorAll(".option-btn").forEach((optionBtn) => {
      optionBtn.addEventListener("click", () => {
        group.querySelectorAll(".option-btn").forEach((b) => b.classList.remove("selected"));
        optionBtn.classList.add("selected");
        answers[field] = optionBtn.textContent.trim();
        setTimeout(() => goToStep(current + 1), 250);
      });
    });
  });

  box.querySelectorAll("[data-back]").forEach((btn) => {
    btn.addEventListener("click", () => goToStep(Math.max(1, current - 1)));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    answers.name = form.name.value;
    answers.email = form.email.value;
    answers.phone = form.phone.value;
    form.style.display = "none";
    box.querySelector(".diagnostic-progress").style.display = "none";
    success.classList.add("active");
  });
})();

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => revealObserver.observe(el));
