import yoimage from '../Assets/YO.jpg'

const INFO = {
	main: {
		title: "FullStackFolio",
		name: "Sebastian Navarro",
		email: "snpnavarro@outlook",
		logo: yoimage,
	},

	socials: {
		github: "https://github.com/",
		linkedin: "https://linkedin.com/",
		instagram: "https://instagram.com/",

		facebook: "https://facebook.com/",
	},

	homepage: {
		title: "Full-stack web and mobile app developer.",
		description:
			"I am a fullstack developer with a passion for creating innovative and user-friendly web and mobile applications. With a strong foundation in both front-end and back-end technologies, I am dedicated to delivering high-quality solutions that meet the needs of users and businesses alike.",
	},

	about: {
		title: "About Me",
		Subtitle:"I’m Sebastian I live in Costa Rica where I seek to improve my skills and grow as a developer.",
		description:
			"Technical support & advanced troubleshooting Operating Systems: Windows, macOS Platforms & Tools: Salesforce, Zendesk, ServiceNow Web Development: HTML, CSS, JavaScript, Responsive Design, Front-end & Back-end basics Data & Productivity: Advanced Microsoft Excel (VLOOKUP, IF, SUMIFS) Other: Industrial refrigeration systems maintenance and repair, customer service, team leadership, workflow optimization.",
		selfie: yoimage,
	},


	experience: [
		{
			Job:"Job1",
			title: "-Customer Service Specialist & SME",
			company: "MOVATE",
			duration: "August 2024 – Present",

			skills:
				"Operational support, ticket management, customer service, SLA compliance, team training, coaching, communication, problem-solving, coordination between departments, phone/chat/email support.",

			description:
				" Operational support, SLA management, customer service, team training, coaching and ticket coordination."
		},

		{
			Job:"Job2",
			title: "-Technical Support & Quality Coach",
			company: "CONCENTRIX CR",
			duration: "May 2023 – August 2024",

			skills:
				"Technical support, iOS, macOS, troubleshooting, networking, customer support, coaching, QA monitoring, chat support, performance improvement.",

			description:
				" iOS, macOS troubleshooting, networking, customer support,  QA coaching and chat support."
		},

		{
			Job:"Job3",
			title: "-Production Team Lead",
			company: "PIZZA HUT",
			duration: "2022 – 2023",

			skills:
				"Leadership, operations management, workflow optimization, team management, productivity improvement, process organization.",

			description:
				"Team leadership, workflow optimization and production management."
		}
	],

	education: [
		{
			degree: "-Bachelor in Computer Engineering",
			institution: "Universidad Hispanoamericana",
			duration: "Jan 2021 – Present",
		},
		{
			degree: "-Certification in Full Stack Web Development",
			institution: "Ucreativa",
			duration: "Apr 2023 – In progress",
		},
		{
			degree: "-English Program",
			institution: "UNED",
			duration: "Jan 2021 – Completed",
		},
		{
			degree: "-Advanced Microsoft Excel skills",
			institution: "VLOOKUP, IF, SUMIFS",
			duration: "",
		},
	],

	projects: [
		{
			title: "Project 1",
			description:
				"Lorem ipsum dolor sit amet. Et incidunt voluptatem ex tempore repellendus qui dicta nemo sit deleniti minima.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
			linkText: "View Project",
			link: "https://github.com",
		},


	],
};


export default INFO;
