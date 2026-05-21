import yoimage from '../assets/YO.jpg'
import '../Styles/user.css'
const INFO = {
	main: {
		title: "FullStackFolio",
		name: "Sebastian Navarro",
		email: "snpnavarro@outlook",
		logo: yoimage,
	},




	homepage: {
		title: "Full-stack web and mobile app developer.",
		description:
			"Hi, I’m Sebastian — a full‑stack developer in the final stretch of my Computer Engineering degree. I love building web and mobile applications that are not only functional but also intuitive and enjoyable to use. My focus is on blending front‑end creativity with back‑end logic to deliver solutions that feel seamless for both users and businesses. As I continue learning and growing, I’m excited to take on new challenges, collaborate with others, and turn ideas into impactful digital experiences.",
	},

	about: {
		title: "About Me",
		Subtitle: "I’m Sebastian I live in Costa Rica where I seek to improve my skills and grow as a developer.",
		description:
			"Technical Expertise & Support Operating Systems: Windows, macOS Platforms & Tools: Salesforce, Zendesk, ServiceNow Web Development: HTML, CSS, JavaScript, Responsive Design, Front‑end & Back‑end fundamentals Data & Productivity: Advanced Microsoft Excel  and Google Sheets \n Additional Skills Industrial refrigeration systems maintenance and repair Customer service and team leadership Workflow optimization and advanced troubleshooting.",
		selfie: yoimage,
	},


	experience: [
		{
			Job: "Job1",
			title: "Customer Service Specialist & SME",
			company: "-MOVATE",
			duration: "August 2024 – Present",

			skills:
				"Operational support, ticket management, customer service, SLA compliance, team training, coaching, communication, problem-solving, coordination between departments, phone/chat/email support.",

			description:
				" Operational support, SLA management, customer service, team training, coaching and ticket coordination."
		},

		{
			Job: "Job2",
			title: "Technical Support & Quality Coach",
			company: "-CONCENTRIX CR",
			duration: "May 2023 – August 2024",

			skills:
				"Technical support, iOS, macOS, troubleshooting, networking, customer support, coaching, QA monitoring, chat support, performance improvement.",

			description:
				" iOS, macOS troubleshooting, networking, customer support,  QA coaching and chat support."
		},

		{
			Job: "Job3",
			title: "Production Team Lead",
			company: "-PIZZA HUT",
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
			title: "Backend API Dashboard - CRUD Usuarios",
			description:
				"This full-stack project showcases a complete CRUD system with React handling the interactive frontend and Node.js / Express powering the backend API.It features user management with soft delete functionality, comprehensive data validation, and an intuitive dashboard for testing all API endpoints.The application is deployed across multiple platforms: Vercel for the frontend(no login required for demo), Render.com for the backend API, and Supabase.com for the PostgreSQL database. ",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
			linkText: "View Project",
			link: "https://github.com",
			technologies: "React, Node.js, Express, REST API, Database",
			features: ["Complete CRUD Operations", "Soft Delete Functionality", "Interactive API Dashboard", "User Management", "Data Validation"]
		},


	],
};


export default INFO;
