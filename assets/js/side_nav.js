window.addEventListener('DOMContentLoaded', () => {
  

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            

            if (entry.intersectionRatio > 0) {
                document.querySelector(`#sidenav li a[href="#${id}"]`).parentElement.classList.add('active');
            } else {
                document.querySelector(`#sidenav li a[href="#${id}"]`).parentElement.classList.remove('active');
            }
        });
    });

    // Track all sections that have an `id` applied
    document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
    });
    
});



//hide nav bar when on parallax_bg
const sectionNav = document.getElementById("sidenav");             //  [oai_citation:2‡main.css](file-service://file-VmDnA9TA29CYNwSc7Kcm8C)
const parallaxBg = document.querySelector(".parallax_bg");        //  [oai_citation:3‡main.css](file-service://file-VmDnA9TA29CYNwSc7Kcm8C)

// Create an observer that toggles nav visibility
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sectionNav.classList.add("hidden"); 
      } else {
        sectionNav.classList.remove("hidden");
      }
    });
  },
  {
    root: null,          // viewport
    threshold: 0         // callback fires as soon as any pixel is visible
  }
);

observer.observe(parallaxBg);
