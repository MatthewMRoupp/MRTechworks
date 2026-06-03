const articleReader = document.getElementById("articleReader");

const articles = [
  {
    id: "home-wifi-basics",
    title: "Home Wi-Fi Basics",
    category: "Networking",
    summary: "A simple guide to routers, mesh systems, Ethernet, and why Wi-Fi can feel unreliable.",
    image: "assets/images/articlesimage.png",
    tags: ["wifi", "router", "mesh", "ethernet", "networking"],
    content: [
      {
        heading: "What Wi-Fi actually does",
        body: "Wi-Fi lets devices connect to your network without using a cable. It is convenient, but it can be affected by walls, distance, interference, and the quality of the router or mesh system."
      },
      {
        heading: "Why Ethernet is still useful",
        body: "Ethernet uses a physical cable, which usually makes it more stable than Wi-Fi. For gaming, streaming, work computers, and important devices, Ethernet can make the connection more reliable."
      },
      {
        heading: "Why mesh systems can help",
        body: "A mesh system uses multiple units to spread Wi-Fi through a home or building. This can help reduce weak spots, especially in larger spaces or places with thick walls."
      }
    ],
    references: [
      {
        label: "FCC Consumer Guide: Home Network Security",
        url: "https://www.fcc.gov/consumers/guides/how-protect-yourself-online"
      }
    ]
  },
  {
    id: "choosing-a-computer",
    title: "How to Choose the Right Computer",
    category: "Buying Advice",
    summary: "A beginner-friendly guide to picking a computer based on what someone actually needs.",
    image: "assets/images/servicesimage.png",
    tags: ["computer", "laptop", "desktop", "buying", "specs"],
    content: [
      {
        heading: "Start with what the computer is for",
        body: "Before looking at specs, it helps to think about how the computer will actually be used. A computer for school, email, and browsing does not need the same parts as a computer for gaming, video editing, or heavy creative work."
      },
      {
        heading: "Do not only look at the price",
        body: "The cheapest computer is not always the best deal. Sometimes spending a little more can help the computer last longer, feel faster, and avoid frustration later."
      },
      {
        heading: "Match the computer to the person",
        body: "A good computer should fit the person using it. The goal is not always to buy the most powerful machine possible. The goal is to buy the right machine for the job."
      }
    ],
    references: []
  },
  {
    id: "pc-build-vs-prebuilt",
    title: "Custom PC vs. Prebuilt PC",
    category: "PC Builds",
    summary: "A simple comparison of building a computer yourself versus buying one already assembled.",
    image: "assets/images/projectsimage.png",
    tags: ["pc", "custom build", "prebuilt", "gaming", "hardware"],
    content: [
      {
        heading: "Why someone might build a PC",
        body: "Building a PC gives someone more control over the parts, upgrade path, and look of the computer. It can also be a good learning experience for understanding how hardware works."
      },
      {
        heading: "Why someone might buy a prebuilt PC",
        body: "A prebuilt PC can be easier because it is already assembled, tested, and usually comes with support or a warranty. This can be better for someone who wants a working computer without the extra setup."
      },
      {
        heading: "Which one is better?",
        body: "Neither option is always better. A custom build is great for control and learning. A prebuilt is great for convenience and support. The best choice depends on budget, comfort level, and what the computer needs to do."
      }
    ],
    references: []
  }
];

const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");

const article = articles.find(item => item.id === articleId);

if (!article) {
  articleReader.innerHTML = `
    <p class="eyebrow">Article Not Found</p>
    <h1>Sorry, this article could not be found.</h1>
    <p class="lead">
      The article may have moved, or the link may be incorrect.
    </p>
    <p>
      <a class="text-link" href="articles.html">Back to articles</a>
    </p>
  `;
} else {
  document.title = `${article.title} | MR Techworks`;

  const articleSections = article.content
    .map(section => {
      return `
        <h2>${section.heading}</h2>
        <p>${section.body}</p>
      `;
    })
    .join("");

  const articleReferences = article.references.length > 0
    ? `
      <section class="article-references">
        <h2>References</h2>
        <ul>
          ${article.references
            .map(reference => {
              return `
                <li>
                  <a href="${reference.url}" target="_blank" rel="noopener noreferrer">
                    ${reference.label}
                  </a>
                </li>
              `;
            })
            .join("")}
        </ul>
      </section>
    `
    : "";

  articleReader.innerHTML = `
    <p class="eyebrow">${article.category}</p>

    <h1>${article.title}</h1>

    <p class="lead">${article.summary}</p>

    <img src="${article.image}" alt="${article.title}" class="article-hero-image" />

    <div class="article-body">
      ${articleSections}
    </div>

    ${articleReferences}

    <p class="article-back-link">
      <a class="text-link" href="articles.html">Back to articles</a>
    </p>
  `;
}
