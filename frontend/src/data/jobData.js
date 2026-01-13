export const jobListings = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    description: "Looking for a skilled Frontend Developer with 3+ years of React experience. You'll work on building responsive web applications using modern JavaScript frameworks.",
    requirements: ["React", "JavaScript", "CSS", "TypeScript", "Redux", "Git"],
    matchScore: 92,
    aiAnalysis: {
      fit: "Excellent",
      skillsMatch: ["React", "JavaScript", "CSS", "Redux"],
      missingSkills: ["TypeScript"],
      recommendations: ["Highlight your React projects in portfolio", "Consider learning TypeScript basics"]
    }
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    type: "Contract",
    salary: "$90,000 - $130,000",
    posted: "1 week ago",
    description: "Join our fast-growing startup as a Full Stack Engineer. You'll work on both frontend and backend systems, collaborating with a small agile team.",
    requirements: ["Node.js", "React", "AWS", "MongoDB", "Express.js", "Docker"],
    matchScore: 85,
    aiAnalysis: {
      fit: "Good",
      skillsMatch: ["Node.js", "React", "Express.js"],
      missingSkills: ["AWS", "MongoDB", "Docker"],
      recommendations: ["Consider getting AWS certification", "Add MongoDB projects to your portfolio"]
    }
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignStudio",
    location: "New York, NY",
    type: "Full-time",
    salary: "$95,000 - $125,000",
    posted: "3 days ago",
    description: "Creative UI/UX Designer needed for our design team. You'll create user-centered designs for web and mobile applications.",
    requirements: ["Figma", "Adobe XD", "User Research", "Prototyping", "Wireframing", "Design Systems"],
    matchScore: 45,
    aiAnalysis: {
      fit: "Low",
      skillsMatch: [],
      missingSkills: ["Figma", "User Research", "Prototyping"],
      recommendations: ["Consider taking UI/UX design courses", "Build a design portfolio with case studies"]
    }
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "CloudSystems",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    posted: "1 day ago",
    description: "Backend Developer with microservices experience. Work on scalable systems using modern backend technologies.",
    requirements: ["Python", "Django", "Docker", "PostgreSQL", "AWS", "REST APIs"],
    matchScore: 78,
    aiAnalysis: {
      fit: "Good",
      skillsMatch: ["Python", "Django", "PostgreSQL"],
      missingSkills: ["Docker", "AWS"],
      recommendations: ["Learn Docker containerization", "Highlight your database optimization experience"]
    }
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "InfraTech",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    posted: "4 days ago",
    description: "DevOps Engineer for CI/CD pipeline management and cloud infrastructure. Automate deployment processes and ensure system reliability.",
    requirements: ["Kubernetes", "Docker", "AWS", "Jenkins", "Terraform", "CI/CD"],
    matchScore: 35,
    aiAnalysis: {
      fit: "Low",
      skillsMatch: [],
      missingSkills: ["Kubernetes", "AWS", "Terraform", "Jenkins"],
      recommendations: ["Consider DevOps certification programs", "Learn infrastructure as code with Terraform"]
    }
  },
  {
    id: 6,
    title: "Product Manager",
    company: "ProductLabs",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140,000 - $180,000",
    posted: "1 week ago",
    description: "Product Manager with technical background. Lead product strategy, work with engineering teams, and drive product development.",
    requirements: ["Product Strategy", "Agile", "Data Analysis", "Technical Background", "User Stories", "Roadmapping"],
    matchScore: 88,
    aiAnalysis: {
      fit: "Very Good",
      skillsMatch: ["Agile", "Technical Background", "Data Analysis"],
      missingSkills: ["Product Strategy formal training"],
      recommendations: ["Highlight project management experience", "Show examples of data-driven decision making"]
    }
  },
  {
    id: 7,
    title: "Data Scientist",
    company: "DataInsights",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $155,000",
    posted: "2 days ago",
    description: "Data Scientist with ML and statistics experience. Build predictive models and analyze large datasets to drive business insights.",
    requirements: ["Python", "Machine Learning", "Statistics", "SQL", "TensorFlow", "Pandas", "NumPy"],
    matchScore: 65,
    aiAnalysis: {
      fit: "Moderate",
      skillsMatch: ["Python", "SQL", "Pandas", "NumPy"],
      missingSkills: ["Machine Learning", "TensorFlow", "Statistics"],
      recommendations: ["Take machine learning courses online", "Build data science projects for your portfolio"]
    }
  },
  {
    id: 8,
    title: "Mobile Developer",
    company: "AppWorks",
    location: "Los Angeles, CA",
    type: "Contract",
    salary: "$100,000 - $135,000",
    posted: "5 days ago",
    description: "React Native developer for cross-platform mobile applications. Build and maintain mobile apps for iOS and Android.",
    requirements: ["React Native", "JavaScript", "iOS/Android", "Redux", "Mobile UI", "API Integration"],
    matchScore: 95,
    aiAnalysis: {
      fit: "Excellent",
      skillsMatch: ["React Native", "JavaScript", "Redux", "API Integration"],
      missingSkills: [],
      recommendations: ["Apply immediately - excellent match!", "Prepare React Native code samples"]
    }
  },
  {
    id: 9,
    title: "Cloud Architect",
    company: "CloudNative Inc",
    location: "Remote",
    type: "Full-time",
    salary: "$150,000 - $200,000",
    posted: "2 days ago",
    description: "Design and implement cloud infrastructure solutions. Lead cloud migration projects and ensure security best practices.",
    requirements: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "Security", "Microservices"],
    matchScore: 40,
    aiAnalysis: {
      fit: "Moderate",
      skillsMatch: ["AWS"],
      missingSkills: ["Azure", "GCP", "Terraform", "Kubernetes"],
      recommendations: ["Get AWS Solutions Architect certification", "Learn multi-cloud strategies"]
    }
  },
  {
    id: 10,
    title: "QA Automation Engineer",
    company: "QualityFirst",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$85,000 - $115,000",
    posted: "3 days ago",
    description: "Automation engineer to build and maintain test frameworks. Ensure software quality through automated testing.",
    requirements: ["Selenium", "Cypress", "JavaScript", "Test Automation", "CI/CD", "Jest"],
    matchScore: 70,
    aiAnalysis: {
      fit: "Good",
      skillsMatch: ["JavaScript", "Jest"],
      missingSkills: ["Selenium", "Cypress", "Test Automation"],
      recommendations: ["Learn test automation frameworks", "Show testing experience in portfolio"]
    }
  }
];

export const jobFilters = {
  types: ["All", "Full-time", "Part-time", "Contract", "Remote", "Internship"],
  locations: ["All", "Remote", "San Francisco", "New York", "Austin", "Seattle", "Boston", "Los Angeles", "Chicago"],
  experienceLevels: ["All", "Entry", "Mid", "Senior", "Executive"],
  salaries: ["All", "$50k+", "$80k+", "$100k+", "$120k+", "$150k+"]
};
