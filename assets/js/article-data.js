/*
  MR Techworks Article Data
  -------------------------
  Load this file BEFORE articles.js or article-reader.js.

  Example:
  <script src="assets/js/article-data.js"></script>
  <script src="assets/js/articles.js"></script>
*/

window.MRTECHWORKS_ARTICLES = [
  {
    id: "home-wifi-basics",
    title: "Home Wi-Fi Basics: Routers, Mesh, Ethernet, and Why Wi-Fi Acts Weird",
    category: "Networking",
    difficulty: "Beginner",
    readTime: "9 min read",
    updated: "2026-06-05",
    summary: "A practical guide to how home Wi-Fi works, why speed tests do not always tell the full story, and how to make a home network feel more reliable.",
    image: "assets/images/articlesimage.png",
    tags: ["wifi", "router", "mesh", "ethernet", "networking", "internet"],
    keyTakeaways: [
      "Wi-Fi is only the wireless part of your home network; your internet service, modem, router, and device all affect performance.",
      "Ethernet is still the most reliable option for gaming, workstations, cameras, TVs, and mesh backhaul.",
      "Mesh systems help coverage, but placement matters more than simply adding more nodes."
    ],
    content: [
      {
        heading: "Wi-Fi and internet are related, but they are not the same thing",
        body: [
          "A common mistake is saying the internet is bad when the real problem is the Wi-Fi signal inside the house. Your internet service comes from the provider into a modem or gateway. Your router then shares that connection with your devices. Wi-Fi is the wireless signal from the router or mesh system to phones, laptops, TVs, consoles, smart devices, and other equipment.",
          "That means a speed problem can happen in more than one place. The provider connection could be slow, the router could be overloaded, the Wi-Fi signal could be weak, or one device could simply be too old to keep up. Good troubleshooting starts by separating those possibilities instead of guessing."
        ]
      },
      {
        heading: "What the router actually does",
        body: [
          "A router directs traffic between your home network and the internet. It also usually handles Wi-Fi, local IP addresses, firewall features, and device management. In many homes, the modem and router are combined into one box from the internet provider. That can work fine, but provider gateways are not always the best for coverage, features, or long-term control.",
          "If your Wi-Fi feels inconsistent, the router should be one of the first things checked. Age, firmware updates, placement, overheating, and too many connected devices can all affect the experience. A router hidden in a cabinet, placed behind a TV, or sitting in a basement corner has to fight the house before the signal ever reaches your device."
        ]
      },
      {
        heading: "Why Ethernet is still worth using",
        body: [
          "Ethernet uses a physical cable instead of radio waves. That usually means lower latency, fewer random drops, and more consistent speed. For gaming, video calls, desktop computers, network storage, cameras, smart TVs, and mesh nodes, Ethernet is often the cleanest fix.",
          "Ethernet does not make your internet plan faster, but it can help your device use the speed you already pay for more reliably. If a desktop gets 900 Mbps on Ethernet but only 180 Mbps on Wi-Fi from the same location, the internet plan is probably not the problem. The wireless path is."
        ]
      },
      {
        heading: "What mesh Wi-Fi fixes, and what it does not fix",
        body: [
          "A mesh system uses multiple access points to spread Wi-Fi through the home. This helps when one router cannot cover the whole building. Mesh is especially useful in larger homes, older homes with thick walls, finished basements, garages, and multi-floor layouts.",
          "The catch is that mesh nodes still need a good signal to each other. If a mesh node is placed in a dead zone, it may repeat a weak signal instead of solving the weak signal. A better approach is to place the node halfway between the strong signal area and the weak area. For the best results, use Ethernet backhaul when possible so the mesh nodes do not have to talk wirelessly to each other."
        ]
      },
      {
        heading: "A simple troubleshooting order",
        body: [
          "Start with the basic path: internet service, modem, router, Wi-Fi signal, then device. Test one wired device directly from the router if possible. Then test Wi-Fi close to the router. Then test farther away. This shows whether the issue is the provider connection, the router, the wireless coverage, or one device.",
          "Also check for patterns. If every device struggles, look at the router or provider. If only one room struggles, look at placement or coverage. If only one laptop struggles, check that laptop before replacing networking equipment. Good troubleshooting is less about fancy tools and more about narrowing the problem one step at a time."
        ]
      }
    ],
    checklistTitle: "Quick Wi-Fi improvement checklist",
    checklist: [
      "Move the router or main mesh unit into a more open, central location.",
      "Use Ethernet for devices that need stability more than mobility.",
      "Restart the modem and router if the whole network is acting strange.",
      "Update router firmware when updates are available.",
      "Avoid putting mesh nodes too far from the main unit.",
      "Rename old unused devices in the router app so the device list is easier to understand."
    ],
    references: [
      { label: "FCC: Broadband Speed Guide", url: "https://www.fcc.gov/consumers/guides/broadband-speed-guide" },
      { label: "CISA: Securing Wireless Networks", url: "https://www.cisa.gov/news-events/news/securing-wireless-networks" },
      { label: "IEEE 802.3 Ethernet Standard Overview", url: "https://standards.ieee.org/ieee/802.3/10422/" }
    ]
  },
  {
    id: "internet-speed-vs-wifi-speed",
    title: "Internet Speed vs. Wi-Fi Speed: Why Your Speed Test Can Be Confusing",
    category: "Networking",
    difficulty: "Beginner",
    readTime: "8 min read",
    updated: "2026-06-05",
    summary: "A clear explanation of Mbps, latency, upload speed, download speed, and why a fast plan can still feel slow inside the house.",
    image: "assets/images/articlesimage.png",
    tags: ["speed test", "wifi", "latency", "upload", "download", "internet"],
    keyTakeaways: [
      "Download speed is only one part of internet performance.",
      "Upload speed, latency, signal quality, and device capability all affect how fast the connection feels.",
      "A wired speed test helps separate internet service problems from Wi-Fi coverage problems."
    ],
    content: [
      {
        heading: "What Mbps actually means",
        body: [
          "Mbps means megabits per second. It measures how much data can move through a connection each second. Internet plans are usually advertised by download speed because most home activity pulls data down from the internet: streaming, browsing, downloading games, opening websites, and watching videos.",
          "The confusing part is that file sizes are usually shown in megabytes or gigabytes, while internet speed is shown in megabits. There are eight bits in one byte, so a 1 gigabyte file is not downloaded in one second on a 1 gigabit connection. Real-world overhead, server limits, Wi-Fi quality, and device performance also matter."
        ]
      },
      {
        heading: "Download, upload, and latency do different jobs",
        body: [
          "Download speed affects how quickly you receive data. Upload speed affects how quickly you send data. Upload matters for video calls, cloud backups, sending large files, livestreaming, security cameras, and online classes or meetings.",
          "Latency is the response time between your device and a server. Low latency matters for gaming, video calls, remote work, and anything interactive. A connection can show a high download speed but still feel bad if latency is unstable or if Wi-Fi drops packets."
        ]
      },
      {
        heading: "Why a fast internet plan can still feel slow",
        body: [
          "A fast plan only means the provider connection can deliver that speed under the right conditions. Inside the home, the connection still has to pass through the modem, router, Wi-Fi signal, walls, interference, and the device itself. Older laptops, budget phones, crowded apartments, and poor router placement can all reduce performance.",
          "This is why one device can be fast while another device feels terrible. It is also why a wired desktop may get excellent speed while a phone upstairs struggles. The plan may be fine, but the wireless path may not be."
        ]
      },
      {
        heading: "How to test the right way",
        body: [
          "Run a speed test near the router and then again in the problem area. If possible, run a wired Ethernet test from a laptop or desktop connected directly to the router. If the wired test is close to the plan speed but the Wi-Fi test is much lower, the issue is probably Wi-Fi coverage, interference, or device capability.",
          "If the wired test is also much lower than expected, check the modem, router, cables, and provider status. A single bad Ethernet cable, old router port, or outdated modem can limit the whole connection. Testing in layers keeps the troubleshooting from turning into random button pressing."
        ]
      }
    ],
    checklistTitle: "Better speed test checklist",
    checklist: [
      "Test with Ethernet when possible.",
      "Test close to the router and in the weak area.",
      "Check both upload and download speed.",
      "Look for latency or ping spikes, not only Mbps.",
      "Restart the modem/router before assuming the provider is the issue.",
      "Try more than one device to avoid blaming the network for one bad device."
    ],
    references: [
      { label: "FCC: Broadband Speed Guide", url: "https://www.fcc.gov/consumers/guides/broadband-speed-guide" },
      { label: "FCC: Household Broadband Guide PDF", url: "https://www.fcc.gov/sites/default/files/household_broadband_guide.pdf" }
    ]
  },
  {
    id: "home-network-security-checklist",
    title: "Home Network Security Checklist: Simple Steps That Actually Matter",
    category: "Security",
    difficulty: "Beginner",
    readTime: "10 min read",
    updated: "2026-06-05",
    summary: "A practical security checklist for routers, Wi-Fi passwords, guest networks, smart devices, and safe home networking habits.",
    image: "assets/images/articlesimage.png",
    tags: ["security", "router", "wifi password", "guest network", "smart home", "updates"],
    keyTakeaways: [
      "A secure home network starts with the router, not just the devices connected to it.",
      "WPA3 or WPA2, strong passwords, firmware updates, and guest networks are basic but important protections.",
      "Smart devices should be treated like small computers that need updates and account protection."
    ],
    content: [
      {
        heading: "Start with the router admin password",
        body: [
          "Your Wi-Fi password and your router admin password are usually two different things. The Wi-Fi password lets devices join the network. The admin password lets someone change router settings. If the admin password is still the default, anyone with access to the router interface may be able to change important settings.",
          "Change the admin password to something unique and save it in a safe place. This is one of the least exciting security steps, but it matters because the router controls traffic for the whole home network."
        ]
      },
      {
        heading: "Use strong Wi-Fi encryption",
        body: [
          "Modern home Wi-Fi should use WPA3 Personal when all devices support it. WPA2 Personal is still common and acceptable for many homes, but older options like WEP should not be used. Encryption helps prevent nearby people from reading wireless traffic or casually joining the network.",
          "If a router offers a mixed WPA2/WPA3 mode, it can help compatibility with older devices. However, if everything in the home supports WPA3, using WPA3 directly is usually cleaner. The best setting depends on the router and the devices in the home."
        ]
      },
      {
        heading: "Use a guest network for visitors and smart devices",
        body: [
          "A guest network gives visitors internet access without putting them directly on the same network as your main computers, phones, printers, and storage devices. This is useful because you do not control how secure every visitor device is.",
          "Some homes also place smart devices on a separate guest or IoT network. Smart bulbs, cameras, plugs, speakers, and low-cost sensors are convenient, but they may not receive updates as consistently as phones and computers. Separating them can reduce risk if one device has a weakness."
        ]
      },
      {
        heading: "Keep firmware and devices updated",
        body: [
          "Routers run firmware, which is software built into the device. Firmware updates can fix bugs, add features, and patch security issues. Many modern routers update automatically, but not all do. It is worth checking the router app or admin page occasionally.",
          "The same idea applies to phones, laptops, TVs, game consoles, cameras, and smart devices. Updates can feel annoying, but they are one of the main ways manufacturers fix discovered problems."
        ]
      },
      {
        heading: "Security should be practical, not scary",
        body: [
          "Home network security does not need to be perfect to be useful. The goal is to remove easy risks: default passwords, weak encryption, old firmware, unknown devices, and accounts without multi-factor authentication. These steps make the home network harder to casually abuse and easier to manage over time."
        ]
      }
    ],
    checklistTitle: "Home network security checklist",
    checklist: [
      "Change the router admin password.",
      "Use WPA3 Personal if supported, or WPA2 Personal if needed for compatibility.",
      "Use a strong Wi-Fi password that is not reused elsewhere.",
      "Turn on automatic firmware updates if the router supports them.",
      "Create a guest network for visitors.",
      "Review the connected device list and rename devices you recognize.",
      "Remove or replace devices that no longer receive updates."
    ],
    references: [
      { label: "FTC: How To Secure Your Home Wi-Fi Network", url: "https://consumer.ftc.gov/node/78375" },
      { label: "CISA: Home Network Security", url: "https://www.cisa.gov/news-events/news/home-network-security" },
      { label: "CISA: Securing Wireless Networks", url: "https://www.cisa.gov/news-events/news/securing-wireless-networks" },
      { label: "FTC: Securing Your Internet-Connected Devices at Home", url: "https://consumer.ftc.gov/articles/securing-your-internet-connected-devices-home" }
    ]
  },
  {
    id: "mesh-vs-extenders-vs-ethernet",
    title: "Mesh Wi-Fi vs. Extenders vs. Ethernet: What Should You Use?",
    category: "Networking",
    difficulty: "Beginner",
    readTime: "8 min read",
    updated: "2026-06-05",
    summary: "A plain-English comparison of the most common ways to fix weak Wi-Fi coverage in a house or small office.",
    image: "assets/images/articlesimage.png",
    tags: ["mesh", "wifi extender", "ethernet", "coverage", "backhaul"],
    keyTakeaways: [
      "Ethernet is best for stability when running a cable is realistic.",
      "Mesh Wi-Fi is usually better than old-style extenders for whole-home coverage.",
      "More Wi-Fi hardware is not always better; placement and backhaul matter."
    ],
    content: [
      {
        heading: "The real problem is usually coverage, not magic internet dust",
        body: [
          "Weak Wi-Fi usually happens because the signal has to pass through distance, walls, floors, appliances, furniture, and interference from other networks. People often buy a faster internet plan hoping it will fix weak coverage, but a faster plan does not make a bad signal travel better through a house.",
          "The best fix depends on the building. A small apartment may only need better router placement. A large house may need mesh. A gaming room or office may need Ethernet. A detached garage may need a dedicated wired access point."
        ]
      },
      {
        heading: "Ethernet: best stability, more installation effort",
        body: [
          "Ethernet is the most reliable option because it uses a cable. It avoids many Wi-Fi problems like interference and weak signal. If you can run Ethernet to a desktop, TV, console, camera, printer, or mesh node, it is usually worth doing.",
          "The downside is physical work. Running cable may require wall fishing, basement access, attic access, cable clips, drilling, or professional help. For renters or finished spaces, Ethernet may not always be realistic."
        ]
      },
      {
        heading: "Mesh Wi-Fi: best convenience for whole-home coverage",
        body: [
          "Mesh systems use multiple units that work together under one network name. They are usually easier for normal households because the app handles most of the setup. A good mesh setup can make roaming from room to room feel smoother than using separate extender networks.",
          "Mesh works best when the nodes are placed carefully. Each node should still have a decent connection back to the main unit. If the mesh node is too far away, it may broadcast a strong signal to your phone while still having a weak connection back to the router. That creates the classic problem where Wi-Fi bars look fine but the internet feels bad."
        ]
      },
      {
        heading: "Extenders: cheap, but often not the cleanest fix",
        body: [
          "A Wi-Fi extender repeats an existing wireless signal. It can help in a small dead spot, but it can also add complexity, lower performance, or create a second network name that devices do not roam between smoothly.",
          "Extenders are not useless, but they are usually a budget patch instead of a long-term network design. If the home has several weak areas, mesh or wired access points are usually a better direction."
        ]
      },
      {
        heading: "The best setup is often a mix",
        body: [
          "A practical home network might use Ethernet for the desktop, TV, game console, and mesh backhaul, while phones and tablets stay on Wi-Fi. The goal is not to force everything onto one technology. The goal is to use the most reliable option where it matters and the most convenient option where mobility matters."
        ]
      }
    ],
    checklistTitle: "Best-fit decision guide",
    checklist: [
      "Use Ethernet when the device stays in one place and stability matters.",
      "Use mesh when the whole home needs better wireless coverage.",
      "Use an extender only for a small coverage gap or short-term fix.",
      "Use Ethernet backhaul for mesh nodes when possible.",
      "Do not place mesh nodes inside dead zones.",
      "Avoid buying more nodes than the space actually needs."
    ],
    references: [
      { label: "IEEE 802.3 Ethernet Standard Overview", url: "https://standards.ieee.org/ieee/802.3/10422/" },
      { label: "CISA: Securing Wireless Networks", url: "https://www.cisa.gov/news-events/news/securing-wireless-networks" },
      { label: "FCC: Broadband Speed Guide", url: "https://www.fcc.gov/consumers/guides/broadband-speed-guide" }
    ]
  },
  {
    id: "password-managers-and-mfa",
    title: "Password Managers and MFA: A Simple Guide to Safer Accounts",
    category: "Security",
    difficulty: "Beginner",
    readTime: "10 min read",
    updated: "2026-06-05",
    summary: "A practical guide to strong passwords, password reuse, multi-factor authentication, authenticator apps, and safer account habits.",
    image: "assets/images/articlesimage.png",
    tags: ["passwords", "password manager", "mfa", "2fa", "account security"],
    keyTakeaways: [
      "Long, unique passwords are safer than short passwords reused across many accounts.",
      "A password manager helps create and store unique passwords without needing to memorize all of them.",
      "MFA adds another layer of protection, especially for email, banking, school, work, and cloud storage accounts."
    ],
    content: [
      {
        heading: "The biggest password problem is reuse",
        body: [
          "Most people do not get hacked because someone guessed one perfect password in a movie-style cyber battle. A more common problem is password reuse. If the same password is used on several websites, one breached website can put the other accounts at risk too.",
          "That is why unique passwords matter. Your email password should not match your shopping password, bank password, game account password, or school password. Email is especially important because it often controls password resets for other accounts."
        ]
      },
      {
        heading: "Long passwords are easier to use than weird passwords",
        body: [
          "Old password advice often focused on complicated rules: uppercase letters, lowercase letters, numbers, symbols, and frequent forced changes. Current guidance puts more emphasis on length, uniqueness, and checking against known compromised passwords.",
          "A longer passphrase can be easier to remember and harder to guess than a short password with symbol swaps. For example, a phrase-style password can be more usable than something tiny and chaotic. The key is that it should be unique and not based on obvious personal information."
        ]
      },
      {
        heading: "What a password manager does",
        body: [
          "A password manager stores your passwords in an encrypted vault. You remember one strong master password, and the manager helps create unique passwords for each account. This makes it much easier to stop reusing passwords everywhere.",
          "A password manager can also help spot fake login pages. If the manager does not offer to fill a password on a page that looks like your bank or email provider, pause and check the address carefully. That small friction can prevent a phishing mistake."
        ]
      },
      {
        heading: "Why MFA matters",
        body: [
          "Multi-factor authentication, often called MFA or 2FA, requires another proof besides the password. That proof might be a code from an authenticator app, a hardware security key, a passkey, or a prompt on a trusted device.",
          "MFA is not magic, but it helps. If someone steals a password, they still may not be able to sign in without the second factor. For important accounts, MFA should be turned on wherever possible."
        ]
      },
      {
        heading: "Where to start first",
        body: [
          "Start with the accounts that would hurt the most if they were stolen: email, banking, school, work, phone provider, cloud storage, password manager, and social media. Give each one a unique password and turn on MFA. Once the high-risk accounts are handled, work through the rest over time."
        ]
      }
    ],
    checklistTitle: "Account security starter checklist",
    checklist: [
      "Use a unique password for every important account.",
      "Turn on MFA for email, banking, school, work, and cloud storage.",
      "Use an authenticator app or passkey when available.",
      "Avoid SMS codes when stronger options are available, but SMS is still better than no MFA.",
      "Store recovery codes somewhere safe.",
      "Change reused passwords first."
    ],
    references: [
      { label: "NIST SP 800-63B: Password Guidance", url: "https://pages.nist.gov/800-63-4/sp800-63b.html" },
      { label: "CISA: Multifactor Authentication", url: "https://www.cisa.gov/topics/cybersecurity-best-practices/multifactor-authentication" },
      { label: "FTC: How To Recognize and Avoid Phishing Scams", url: "https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams" },
      { label: "Microsoft: Protect Yourself From Phishing", url: "https://support.microsoft.com/en-us/security/protect-yourself-from-phishing" }
    ]
  },
  {
    id: "phishing-and-tech-support-scams",
    title: "Phishing and Tech Support Scams: How to Slow Down Before You Click",
    category: "Security",
    difficulty: "Beginner",
    readTime: "9 min read",
    updated: "2026-06-05",
    summary: "A realistic guide to suspicious emails, fake warnings, urgent texts, remote access scams, and safer ways to verify messages.",
    image: "assets/images/articlesimage.png",
    tags: ["phishing", "scams", "email", "tech support scam", "security"],
    keyTakeaways: [
      "Scams often use urgency, fear, money, account warnings, or fake authority to rush people.",
      "Do not use contact information from a suspicious message; verify through an official website or known trusted source.",
      "Remote access requests from unexpected callers are a major red flag."
    ],
    content: [
      {
        heading: "A scam usually tries to rush you",
        body: [
          "Phishing is a trick where someone tries to get passwords, codes, money, account access, or personal information by pretending to be someone else. The message may look like it came from a bank, delivery company, school, employer, streaming service, antivirus company, or even someone you know.",
          "The pressure is the clue. Scam messages often say something is urgent: your account will close, a payment failed, a package is stuck, your computer is infected, or someone has used your card. The goal is to make you act before you think."
        ]
      },
      {
        heading: "Do not click first; verify first",
        body: [
          "If a message seems important, open a new browser tab and go to the official website yourself. Do not use the link in the suspicious email or text. For a bank or card, use the number on the back of the card. For a school or workplace, use the normal portal or known contact method.",
          "This habit is simple but powerful. It separates real account issues from fake messages designed to steal information."
        ]
      },
      {
        heading: "Tech support scams are built on fear",
        body: [
          "A tech support scam may claim your computer is infected, your Microsoft account is locked, your antivirus expired, or your bank account is at risk. The scammer may ask you to call a number, install remote access software, buy gift cards, move money, or provide login codes.",
          "Legitimate tech companies do not randomly call people to say their computer has a problem. Pop-up warnings that trap the browser, shout about viruses, or demand a phone call should be treated as suspicious."
        ]
      },
      {
        heading: "What to do if you already clicked",
        body: [
          "Do not panic, but do act. Disconnect from the situation. Close the page, hang up the call, and do not install anything else. If you entered a password, change it from a safe device and turn on MFA. If you gave payment information, contact the bank or card company. If remote access was installed, remove it and consider having the device checked.",
          "The earlier you stop, the better. Scammers rely on embarrassment to keep people quiet. Asking for help quickly is the right move."
        ]
      }
    ],
    checklistTitle: "Before clicking, ask this",
    checklist: [
      "Was I expecting this message?",
      "Is it trying to scare or rush me?",
      "Does the sender address actually match the organization?",
      "Can I verify this through an official website or known phone number?",
      "Is it asking for passwords, codes, payment, gift cards, or remote access?",
      "Would I still trust this message if it did not look official?"
    ],
    references: [
      { label: "FTC: How To Recognize and Avoid Phishing Scams", url: "https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams" },
      { label: "Microsoft: Protect Yourself From Phishing", url: "https://support.microsoft.com/en-us/security/protect-yourself-from-phishing" },
      { label: "Microsoft: Protect Yourself From Tech Support Scams", url: "https://support.microsoft.com/en-us/windows/protect-yourself-from-tech-support-scams-2ebf91bd-f94c-2a8a-e541-f5c800d18435" },
      { label: "FTC: How To Avoid a Scam", url: "https://consumer.ftc.gov/articles/how-avoid-scam" }
    ]
  },
  {
    id: "backup-basics-3-2-1",
    title: "Backup Basics: How to Protect Files Before Something Goes Wrong",
    category: "Data Protection",
    difficulty: "Beginner",
    readTime: "10 min read",
    updated: "2026-06-05",
    summary: "A practical guide to cloud backup, external drives, File History, Time Machine, and building a simple backup habit that normal people can actually follow.",
    image: "assets/images/articlesimage.png",
    tags: ["backup", "file history", "time machine", "onedrive", "data recovery", "external drive"],
    keyTakeaways: [
      "A backup is only useful if it can be restored when needed.",
      "Cloud sync is helpful, but it is not always the same as a full backup plan.",
      "Important files should exist in more than one place."
    ],
    content: [
      {
        heading: "Backups are boring until they are suddenly priceless",
        body: [
          "Most people think about backups after a hard drive fails, a laptop gets stolen, a phone breaks, ransomware hits, or a file gets deleted. By then, recovery can be expensive, incomplete, or impossible. A backup plan is not exciting, but it protects schoolwork, family photos, tax documents, business files, and personal records.",
          "The best backup system is the one you will actually use. A perfect plan that never gets set up is worse than a simple plan that quietly runs every day."
        ]
      },
      {
        heading: "Cloud sync is helpful, but understand what it does",
        body: [
          "Services like OneDrive, Google Drive, iCloud, and Dropbox can sync files between devices and keep a copy online. That is useful if a laptop dies or you need files from another device. However, sync can also copy mistakes. If a file is deleted, corrupted, or changed, that change may sync too.",
          "Many cloud services offer version history or deleted-file recovery, but limits vary. That is why cloud sync should be part of a backup plan, not the only thing someone understands."
        ]
      },
      {
        heading: "External drives are still useful",
        body: [
          "An external hard drive or SSD can hold local backups without relying on internet speed. Windows File History can back up selected folders to an external drive or network location. macOS Time Machine can automatically back up files to a connected storage device.",
          "Local backups are especially useful for large photo libraries, videos, project folders, and full computer recovery. The downside is that a drive connected all the time can be damaged, stolen, or affected by malware. For important files, it helps to disconnect a backup drive when it is not actively backing up."
        ]
      },
      {
        heading: "The simple 3-2-1 idea",
        body: [
          "A common backup idea is 3-2-1: keep three copies of important data, on two different types of storage, with one copy off-site. For a normal household, that might mean the computer, an external drive, and a cloud backup. For a small business, it may mean a computer or server, a local NAS, and cloud storage or another off-site backup.",
          "The exact tools can vary. The important part is avoiding one single point of failure. If every copy is in one laptop bag, that is not much of a backup plan."
        ]
      },
      {
        heading: "Test restores before you trust the backup",
        body: [
          "A backup should be tested. You do not need to restore the whole computer every week, but you should occasionally recover a sample file and confirm it opens. A backup that cannot restore is just a comforting decoration. Fancy, but useless."
        ]
      }
    ],
    checklistTitle: "Simple backup checklist",
    checklist: [
      "Identify the folders that actually matter: Documents, Desktop, Photos, schoolwork, tax files, and projects.",
      "Turn on cloud sync for critical everyday files.",
      "Use File History, Time Machine, or another backup tool for local backups.",
      "Keep at least one copy away from the computer itself.",
      "Test restoring a file every so often.",
      "Write down where backups are stored and how to restore them."
    ],
    references: [
      { label: "Microsoft: Back Up and Restore With Windows Backup", url: "https://support.microsoft.com/en-us/windows/back-up-and-restore-with-windows-backup-87a81f8a-78fa-456e-b521-ac0560e32338" },
      { label: "Microsoft: Backup and Restore With File History", url: "https://support.microsoft.com/en-us/windows/backup-and-restore-with-file-history-7bf065bf-f1ea-0a78-c1cf-7dcf51cc8bfc" },
      { label: "Apple: Back Up Your Mac With Time Machine", url: "https://support.apple.com/en-us/104984" },
      { label: "Apple: How to Back Up Your Mac", url: "https://support.apple.com/en-us/102307" }
    ]
  },
  {
    id: "choosing-a-computer",
    title: "How to Choose the Right Computer Without Getting Lost in Specs",
    category: "Buying Advice",
    difficulty: "Beginner",
    readTime: "11 min read",
    updated: "2026-06-05",
    summary: "A beginner-friendly buying guide that explains CPU, RAM, storage, graphics, ports, screen size, and why the best computer depends on the person using it.",
    image: "assets/images/servicesimage.png",
    tags: ["computer", "laptop", "desktop", "buying", "specs", "ram", "ssd"],
    keyTakeaways: [
      "Start with what the computer needs to do, not the sale sticker.",
      "RAM, storage type, screen quality, battery life, keyboard feel, and ports can matter as much as the processor name.",
      "A cheap computer that feels bad every day is not always a good deal."
    ],
    content: [
      {
        heading: "Start with the job, not the brand",
        body: [
          "The right computer depends on the work. A computer for email, school, documents, and video calls does not need the same hardware as one used for gaming, engineering software, video editing, 3D modeling, or heavy creative work. Buying only by brand or discount price can lead to a machine that technically works but feels frustrating every day.",
          "Before comparing models, write down the real use case. Will it travel daily? Sit on a desk? Run Windows-only programs? Need long battery life? Connect to two monitors? Store lots of photos? Play games? Those answers narrow the choices faster than staring at processor names."
        ]
      },
      {
        heading: "CPU: the brain, but not the whole personality",
        body: [
          "The processor affects how quickly the computer handles tasks. For everyday use, a modern mid-range processor is usually enough. For heavier workloads like video editing, software development, large spreadsheets, CAD, or gaming, the CPU matters more.",
          "The tricky part is that processor names are confusing. A newer mid-range chip may beat an older high-end chip. Laptop processors also behave differently depending on cooling and power limits. That is why the full computer design matters, not just the sticker."
        ]
      },
      {
        heading: "RAM: the space for active work",
        body: [
          "RAM is short-term working memory. More RAM helps when many browser tabs, apps, documents, and background tools are open at the same time. Too little RAM can make a computer feel slow even when the processor is fine.",
          "For a modern Windows laptop, 8 GB is a basic starting point, but 16 GB is a better target for comfort and longer useful life. Creative work, gaming, virtual machines, and heavy multitasking may benefit from 32 GB or more. For Chromebooks, the needed amount depends on the model and workload, but higher-end Chromebook Plus devices commonly target 8 GB or more."
        ]
      },
      {
        heading: "Storage: SSD first, size second",
        body: [
          "An SSD makes the computer boot faster, open apps faster, and feel more responsive than an old hard drive. For most new computers, an SSD should be considered essential. Storage size depends on the person. A basic school or office machine might be fine with 256 GB, but 512 GB or 1 TB is more comfortable for photos, videos, games, and long-term use.",
          "Also watch out for very cheap systems with tiny storage. A low price can turn annoying if Windows updates, apps, downloads, and personal files constantly fight for space."
        ]
      },
      {
        heading: "Graphics: only pay for what you need",
        body: [
          "Integrated graphics are fine for web browsing, documents, streaming, video calls, and many school tasks. A dedicated GPU matters for gaming, 3D work, video editing, some AI tools, and certain creative programs.",
          "For gaming computers, the graphics card usually has the biggest effect on performance. For non-gaming users, paying extra for a dedicated GPU may add cost, heat, weight, fan noise, and lower battery life without much benefit."
        ]
      },
      {
        heading: "The stuff people forget to check",
        body: [
          "A computer is more than internal specs. Screen brightness, keyboard feel, trackpad quality, webcam, microphone, speakers, fan noise, weight, charging port, number of USB ports, HDMI support, Wi-Fi version, and upgradeability all affect daily life.",
          "A laptop with great specs but a dim screen, weak battery, and terrible keyboard may be the wrong choice for school or work. A desktop with fewer portability concerns can focus more on performance, repairability, and upgrade options."
        ]
      }
    ],
    checklistTitle: "Buying checklist",
    checklist: [
      "List the top three things the computer must do.",
      "Choose laptop, desktop, Chromebook, Mac, or Windows based on software needs.",
      "Aim for SSD storage, not an old hard drive.",
      "Consider 16 GB RAM for a smoother Windows experience when budget allows.",
      "Check ports before buying dongles later.",
      "Look at warranty, return policy, and repairability.",
      "Avoid paying for gaming hardware if the person does not game or run GPU-heavy software."
    ],
    references: [
      { label: "Microsoft: Windows 11 Specifications", url: "https://www.microsoft.com/en-us/windows/windows-11-specifications" },
      { label: "Microsoft Support: Windows 11 System Requirements", url: "https://support.microsoft.com/en-us/windows/windows-11-system-requirements-86c11283-ea52-4782-9efd-7674389a7ba3" },
      { label: "Google Support: Chromebook Plus OS Update Eligibility", url: "https://support.google.com/chromebook/answer/14128000?hl=en" },
      { label: "Adobe: Photoshop Technical Requirements", url: "https://helpx.adobe.com/photoshop/desktop/get-started/technical-requirements-installation/adobe-photoshop-on-desktop-technical-requirements.html" },
      { label: "Adobe: Premiere Pro Technical Requirements", url: "https://helpx.adobe.com/premiere/desktop/get-started/technical-requirements/adobe-premiere-pro-technical-requirements.html" }
    ]
  },
  {
    id: "pc-build-vs-prebuilt",
    title: "Custom PC vs. Prebuilt PC: Which One Makes More Sense?",
    category: "PC Builds",
    difficulty: "Beginner",
    readTime: "10 min read",
    updated: "2026-06-05",
    summary: "A balanced guide to building a computer yourself versus buying one already assembled, including cost, support, warranties, upgrades, and risk.",
    image: "assets/images/projectsimage.png",
    tags: ["pc", "custom build", "prebuilt", "gaming", "hardware", "desktop"],
    keyTakeaways: [
      "Building gives more control, better learning, and easier part selection.",
      "Prebuilt systems offer convenience, one purchase, and support from the seller or manufacturer.",
      "The better choice depends on budget, comfort level, warranty needs, and how much customization matters."
    ],
    content: [
      {
        heading: "Building gives control",
        body: [
          "A custom PC lets you choose the exact processor, graphics card, motherboard, RAM, storage, case, power supply, cooling, and look of the system. That control is useful when someone has a specific goal, such as quiet operation, upgrade room, a certain color theme, small size, or strong gaming performance for a specific resolution.",
          "Building also teaches how computers fit together. After building one, upgrades and troubleshooting usually feel less mysterious. That learning value is real, especially for someone interested in technology or IT work."
        ]
      },
      {
        heading: "Prebuilt gives convenience",
        body: [
          "A prebuilt PC arrives assembled, tested, and ready for setup. For someone who does not want to manage compatibility, cable routing, BIOS updates, Windows installation, or troubleshooting a no-display problem, that convenience matters.",
          "A prebuilt can also simplify support because the whole machine comes from one seller or manufacturer. Instead of diagnosing which part failed and contacting separate companies, the owner may be able to contact one support channel."
        ]
      },
      {
        heading: "The hidden risk is part quality",
        body: [
          "Some prebuilts use excellent parts. Others save money in places buyers do not notice, such as power supply quality, motherboard features, cooling, RAM configuration, storage speed, or case airflow. Two systems with the same CPU and GPU can perform differently if one runs hot or uses weaker supporting parts.",
          "Custom builds avoid some of that uncertainty because each part is selected intentionally. However, custom builds also shift responsibility to the builder. If something does not work, the builder has to troubleshoot it. Tiny goblin tax, basically."
        ]
      },
      {
        heading: "Warranty differences matter",
        body: [
          "With a custom build, each part has its own warranty. That can be good because quality components may have strong individual warranties, but it also means the owner must identify which part failed. With a prebuilt, the full system warranty may be easier to use, especially for someone who does not want to diagnose hardware failures.",
          "For a business, family member, or non-technical user, support can matter more than squeezing out the best possible part list. The right answer is not always the most powerful answer."
        ]
      },
      {
        heading: "A practical decision rule",
        body: [
          "Build if you want control, learning, upgrade flexibility, and you are comfortable troubleshooting. Buy prebuilt if you want a working system quickly, prefer a single warranty path, or do not want to handle assembly risk. Either option can be good if the parts, price, and support make sense."
        ]
      }
    ],
    checklistTitle: "Custom vs. prebuilt checklist",
    checklist: [
      "Compare the full parts list, not only CPU and GPU.",
      "Check power supply brand, rating, and wattage.",
      "Look for dual-channel RAM on gaming systems.",
      "Check case airflow and cooling reviews.",
      "Understand the warranty before buying.",
      "Leave room in the budget for monitor, keyboard, mouse, speakers/headset, and Windows if needed."
    ],
    references: [
      { label: "Microsoft: Windows 11 Specifications", url: "https://www.microsoft.com/en-us/windows/windows-11-specifications" },
      { label: "Adobe: Premiere Pro Technical Requirements", url: "https://helpx.adobe.com/premiere/desktop/get-started/technical-requirements/adobe-premiere-pro-technical-requirements.html" },
      { label: "NVIDIA: GeForce NOW System Requirements", url: "https://www.nvidia.com/en-us/geforce-now/system-reqs/" }
    ]
  },
  {
    id: "basic-computer-maintenance",
    title: "Basic Computer Maintenance: Keep a PC Feeling Healthy",
    category: "Computer Care",
    difficulty: "Beginner",
    readTime: "9 min read",
    updated: "2026-06-05",
    summary: "A simple maintenance guide for updates, startup apps, storage, dust, restarts, safe downloads, and when to ask for help.",
    image: "assets/images/servicesimage.png",
    tags: ["maintenance", "windows", "updates", "storage", "slow computer", "support"],
    keyTakeaways: [
      "Basic maintenance can prevent many slowdowns and small problems.",
      "Updates, storage cleanup, startup control, and safe downloading are more useful than random cleaner apps.",
      "A slow computer should be diagnosed before replacing hardware."
    ],
    content: [
      {
        heading: "Start with updates and restarts",
        body: [
          "Updates can fix bugs, improve stability, and patch security issues. Restarting gives the computer a clean start and lets updates finish installing. Many people close a laptop lid for weeks and never fully restart, then wonder why everything feels haunted.",
          "A good first step for weird behavior is to save work, restart, check updates, and then test again. It sounds basic because it is basic, but basic works more often than people expect."
        ]
      },
      {
        heading: "Watch startup apps",
        body: [
          "Startup apps open automatically when the computer turns on. Some are useful, like security tools or cloud sync. Others quietly slow down the system every day. Too many launchers, updaters, chat apps, RGB tools, and background utilities can make a decent PC feel tired.",
          "Disabling unnecessary startup apps does not uninstall them. It simply stops them from opening automatically. This is a safe performance step when done carefully."
        ]
      },
      {
        heading: "Keep storage from filling completely",
        body: [
          "Computers need free storage for updates, temporary files, downloads, caches, and normal operation. A nearly full drive can cause slowdowns, failed updates, and general weirdness. Photos, videos, game installs, and old downloads are common space hogs.",
          "Before deleting, check what is actually using space. Randomly deleting system folders is a fantastic way to create a new problem with confidence and panic. Use built-in storage tools first."
        ]
      },
      {
        heading: "Dust and heat matter",
        body: [
          "Heat can make a computer slow down to protect itself. Dust buildup blocks airflow, especially in desktops, gaming laptops, and older systems. Loud fans, high temperatures, shutdowns under load, and poor gaming performance can all point toward cooling issues.",
          "Cleaning should be done carefully. Power the device off, avoid liquid cleaners inside the machine, and do not spin fans wildly with compressed air. If opening the computer feels uncomfortable, it is better to ask for help than break clips or cables."
        ]
      },
      {
        heading: "Avoid miracle cleaner apps",
        body: [
          "Many slow-computer ads promise one-click fixes, registry cleaning, driver magic, or instant performance boosts. Some are unnecessary, some are aggressive, and some are shady. Built-in tools, safe updates, proper diagnosis, and good backups are a better foundation than installing random fix-it software."
        ]
      }
    ],
    checklistTitle: "Monthly maintenance checklist",
    checklist: [
      "Restart the computer fully.",
      "Check Windows Update or macOS updates.",
      "Review startup apps.",
      "Delete obvious old downloads after confirming they are not needed.",
      "Empty the recycle bin/trash after reviewing it.",
      "Confirm backups are running.",
      "Look for unusual fan noise, heat, or error messages."
    ],
    references: [
      { label: "Microsoft: Recovery Options in Windows", url: "https://support.microsoft.com/en-us/windows/recovery-options-in-windows-31ce2444-7de3-818c-d626-e3b5a3024da5" },
      { label: "Microsoft: Backup, Restore, and Recovery in Windows", url: "https://support.microsoft.com/en-us/windows/backup-restore-and-recovery-in-windows-e6d629c4-2568-4406-814f-209a2af06ef7" },
      { label: "Microsoft: Protect Yourself From Tech Support Scams", url: "https://support.microsoft.com/en-us/windows/protect-yourself-from-tech-support-scams-2ebf91bd-f94c-2a8a-e541-f5c800d18435" }
    ]
  },
  {
    id: "smart-home-device-safety",
    title: "Smart Home Device Safety: Cameras, Speakers, Plugs, and Bulbs",
    category: "Security",
    difficulty: "Beginner",
    readTime: "8 min read",
    updated: "2026-06-05",
    summary: "A practical guide to safer smart home setup, including separate networks, updates, accounts, cameras, and privacy basics.",
    image: "assets/images/articlesimage.png",
    tags: ["smart home", "iot", "camera", "privacy", "security", "router"],
    keyTakeaways: [
      "Smart devices should be updated and protected like small internet-connected computers.",
      "A separate guest or IoT network can reduce risk.",
      "Account security matters as much as device security."
    ],
    content: [
      {
        heading: "Smart devices are convenient, but they are still computers",
        body: [
          "Smart bulbs, plugs, speakers, thermostats, cameras, doorbells, and appliances can make a home easier to manage. They can also add more internet-connected devices that need accounts, updates, passwords, and privacy decisions.",
          "The risk is not a reason to avoid smart home devices completely. It is a reason to set them up with some basic rules instead of adding twenty mystery gadgets and hoping the Wi-Fi spirits approve."
        ]
      },
      {
        heading: "Use strong account protection",
        body: [
          "Many smart devices are controlled through cloud accounts. If someone gets into the account, they may be able to view cameras, change settings, unlock features, or control devices. Use a unique password for the smart home account and turn on MFA if available.",
          "This matters most for cameras, doorbells, locks, garage doors, and anything that affects privacy or physical access."
        ]
      },
      {
        heading: "Separate networks can help",
        body: [
          "If your router supports a guest network or IoT network, it can be useful to place smart devices there. The goal is to keep less-trusted devices away from personal laptops, phones, printers, and storage devices.",
          "This setup may require testing because some smart devices need phone discovery features that behave differently across networks. Still, separation is worth considering for a cleaner home network."
        ]
      },
      {
        heading: "Think before placing cameras and microphones",
        body: [
          "Cameras and microphones deserve extra thought. Avoid placing indoor cameras in private areas. Review who has account access. Check whether recordings are stored locally, in the cloud, or both. Understand subscription costs before relying on a camera system for safety.",
          "Also check device update history and company reputation. A cheap camera is not a deal if the app is unreliable, updates stop quickly, or privacy controls are weak."
        ]
      }
    ],
    checklistTitle: "Smart home safety checklist",
    checklist: [
      "Use unique passwords for smart home accounts.",
      "Turn on MFA when available.",
      "Update device firmware and apps.",
      "Place smart devices on a guest or IoT network if practical.",
      "Review who has access to camera feeds and device controls.",
      "Avoid using unsupported devices that no longer receive updates.",
      "Check subscription costs before depending on cloud recording."
    ],
    references: [
      { label: "FTC: Securing Your Internet-Connected Devices at Home", url: "https://consumer.ftc.gov/articles/securing-your-internet-connected-devices-home" },
      { label: "CISA: Home Network Security", url: "https://www.cisa.gov/news-events/news/home-network-security" },
      { label: "FTC: How To Secure Your Home Wi-Fi Network", url: "https://consumer.ftc.gov/node/78375" }
    ]
  },
  {
    id: "repair-upgrade-or-replace",
    title: "Repair, Upgrade, or Replace: What Should You Do With an Older Computer?",
    category: "Buying Advice",
    difficulty: "Beginner",
    readTime: "9 min read",
    updated: "2026-06-05",
    summary: "A practical decision guide for older PCs and laptops, including storage upgrades, RAM, batteries, Windows compatibility, and repair cost judgment.",
    image: "assets/images/servicesimage.png",
    tags: ["repair", "upgrade", "replace", "old computer", "ssd", "ram", "windows 11"],
    keyTakeaways: [
      "A slow computer may only need an SSD, more RAM, cleanup, or a fresh setup.",
      "Replacement makes more sense when repairs cost too much or the device no longer supports needed software.",
      "Windows 11 compatibility, battery health, screen condition, and parts availability all matter."
    ],
    content: [
      {
        heading: "Do not replace before diagnosing",
        body: [
          "A slow computer is not automatically a dead computer. It could be overloaded with startup apps, nearly full on storage, running an old hard drive, low on RAM, overheating, infected with unwanted software, or waiting on updates. Some of those problems are cheap to fix.",
          "The first step is to figure out what is slow. Startup? Web browsing? Opening files? Gaming? Video calls? Everything? The symptom points toward the likely cause."
        ]
      },
      {
        heading: "Upgrades that often help",
        body: [
          "Replacing an old hard drive with an SSD can make an older computer feel dramatically faster. Adding RAM can help with multitasking if the system currently runs out of memory. Cleaning dust and replacing thermal paste can help some overheating systems, though that depends on the device and skill level.",
          "Laptops are more limited than desktops. Some modern laptops have soldered RAM or storage that is difficult or impossible to upgrade. Before planning an upgrade, check the exact model."
        ]
      },
      {
        heading: "When replacement makes sense",
        body: [
          "Replacement starts to make sense when the computer cannot run required software, no longer receives needed updates, has multiple failing parts, has a weak battery plus a damaged screen, or would cost too much to repair compared with buying a better machine.",
          "Windows 11 compatibility is also part of the decision for Windows users. A computer that cannot officially support a modern operating system may still work for some tasks, but it may not be the best long-term choice for everyday use."
        ]
      },
      {
        heading: "The repair math",
        body: [
          "Ask three questions: How much will the repair cost? How old is the device? What would a replacement cost that actually meets the person’s needs? Spending $200 to make a decent computer last a few more years may be smart. Spending $350 on a weak, old laptop with a bad battery and unsupported hardware may not be.",
          "There is also a personal side. A student, parent, remote worker, or small business owner may need reliability more than the absolute cheapest option. Downtime has a cost too."
        ]
      }
    ],
    checklistTitle: "Repair-or-replace checklist",
    checklist: [
      "Check whether the device has an SSD or old hard drive.",
      "Check RAM amount and whether it is upgradeable.",
      "Check battery health on laptops.",
      "Check Windows 11 or required software compatibility.",
      "Compare repair cost against a realistic replacement, not the cheapest random laptop.",
      "Back up files before any repair, upgrade, or reset."
    ],
    references: [
      { label: "Microsoft: Windows 11 System Requirements", url: "https://support.microsoft.com/en-us/windows/windows-11-system-requirements-86c11283-ea52-4782-9efd-7674389a7ba3" },
      { label: "Microsoft: Recovery Options in Windows", url: "https://support.microsoft.com/en-us/windows/recovery-options-in-windows-31ce2444-7de3-818c-d626-e3b5a3024da5" },
      { label: "Microsoft: Back Up and Restore With Windows Backup", url: "https://support.microsoft.com/en-us/windows/back-up-and-restore-with-windows-backup-87a81f8a-78fa-456e-b521-ac0560e32338" }
    ]
  },
  {
    id: "what-to-do-before-tech-support",
    title: "What to Do Before Asking for Tech Support",
    category: "Support",
    difficulty: "Beginner",
    readTime: "7 min read",
    updated: "2026-06-05",
    summary: "A simple guide to collecting useful details before asking for help, so troubleshooting is faster, clearer, and less stressful.",
    image: "assets/images/servicesimage.png",
    tags: ["tech support", "troubleshooting", "error message", "support", "computer help"],
    keyTakeaways: [
      "Good notes make tech support faster.",
      "Screenshots, exact error messages, device model, and recent changes are more useful than saying it does not work.",
      "Simple tests can narrow the issue before deeper troubleshooting starts."
    ],
    content: [
      {
        heading: "Write down what is actually happening",
        body: [
          "The phrase 'it does not work' is understandable, but it does not give much to troubleshoot. A better description includes what you expected, what happened instead, when it started, and whether it happens every time or only sometimes.",
          "For example: 'My laptop connects to Wi-Fi, but websites do not load after waking from sleep. Restarting fixes it for a few hours.' That gives a support person a much better starting point."
        ]
      },
      {
        heading: "Take screenshots and keep error messages",
        body: [
          "Error messages are clues. Do not close them immediately if you can avoid it. Take a screenshot or write down the exact wording. The exact code or message can separate one problem from a completely different one.",
          "If the issue is visual, a photo or screen recording can help too. This is especially useful for flickering screens, printer errors, pop-ups, account warnings, or intermittent problems."
        ]
      },
      {
        heading: "Mention recent changes",
        body: [
          "Recent changes are often connected to new problems. Did an update install? Did the internet provider replace equipment? Did you move the router? Install a new printer? Add antivirus software? Drop the laptop? Change a password? Add a mesh system?"
        ]
      },
      {
        heading: "Try safe basics first",
        body: [
          "Safe first steps include restarting the device, checking cables, confirming power, testing another website, trying another device, checking for updates, and verifying that the account password works in a browser. These steps do not replace real troubleshooting, but they can quickly remove simple causes.",
          "Avoid risky fixes like deleting random system files, installing unknown cleaner tools, changing router settings you do not understand, or giving remote access to someone who contacted you unexpectedly."
        ]
      }
    ],
    checklistTitle: "Useful support details to collect",
    checklist: [
      "Device type, brand, and model if known.",
      "Operating system: Windows, macOS, ChromeOS, iOS, Android, etc.",
      "Exact error message or screenshot.",
      "When the issue started.",
      "What changed recently.",
      "Whether the issue affects one device or many.",
      "What has already been tried."
    ],
    references: [
      { label: "Microsoft: Recovery Options in Windows", url: "https://support.microsoft.com/en-us/windows/recovery-options-in-windows-31ce2444-7de3-818c-d626-e3b5a3024da5" },
      { label: "Microsoft: Protect Yourself From Online Scams and Attacks", url: "https://support.microsoft.com/en-us/security/protect-yourself-from-online-scams-and-attacks" },
      { label: "FTC: How To Avoid a Scam", url: "https://consumer.ftc.gov/articles/how-avoid-scam" }
    ]
  }
];
