/* Logo components using downloaded SVGs from /logos/ */
/* Source: Simple Icons (simpleicons.org) */

function Logo({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="w-full h-full" />
}

// Languages
export const PythonLogo = () => <Logo src="/logos/python.svg" alt="Python" />
export const TypeScriptLogo = () => <Logo src="/logos/typescript.svg" alt="TypeScript" />
export const JavaScriptLogo = () => <Logo src="/logos/javascript.svg" alt="JavaScript" />
export const BashLogo = () => <Logo src="/logos/bash.svg" alt="Bash" />
export const SQLLogo = () => <Logo src="/logos/sql.svg" alt="SQL" />
export const HTMLLogo = () => <Logo src="/logos/html.svg" alt="HTML" />

// Frameworks
export const ReactLogo = () => <Logo src="/logos/react.svg" alt="React" />
export const VueLogo = () => <Logo src="/logos/vue.svg" alt="Vue" />
export const NextLogo = () => <Logo src="/logos/nextjs.svg" alt="Next.js" />
export const NodeLogo = () => <Logo src="/logos/nodejs.svg" alt="Node.js" />
export const TailwindLogo = () => <Logo src="/logos/tailwind.svg" alt="Tailwind CSS" />
export const FastAPILogo = () => <Logo src="/logos/fastapi.svg" alt="FastAPI" />
export const ViteLogo = () => <Logo src="/logos/vite.svg" alt="Vite" />

// Cloud & Infra
export const DockerLogo = () => <Logo src="/logos/docker.svg" alt="Docker" />
export const AWSLogo = () => <Logo src="/logos/aws.svg" alt="AWS" />
export const KubernetesLogo = () => <Logo src="/logos/kubernetes.svg" alt="Kubernetes" />
export const TerraformLogo = () => <Logo src="/logos/terraform.svg" alt="Terraform" />
export const LinuxLogo = () => <Logo src="/logos/linux.svg" alt="Linux" />
export const CloudflareLogo = () => <Logo src="/logos/cloudflare.svg" alt="Cloudflare" />
export const GitLogo = () => <Logo src="/logos/git.svg" alt="Git" />
export const GrafanaLogo = () => <Logo src="/logos/grafana.svg" alt="Grafana" />

// ML / AI
export const PyTorchLogo = () => <Logo src="/logos/pytorch.svg" alt="PyTorch" />
export const LangChainLogo = () => <Logo src="/logos/langchain.svg" alt="LangChain" />
export const OpenAILogo = () => <Logo src="/logos/openai.svg" alt="OpenAI" />
export const HuggingFaceLogo = () => <Logo src="/logos/huggingface.svg" alt="Hugging Face" />
export const ScikitLearnLogo = () => <Logo src="/logos/scikitlearn.svg" alt="scikit-learn" />
export const PandasLogo = () => <Logo src="/logos/pandas.svg" alt="Pandas" />

// DevOps / Monitoring
export const PrometheusLogo = () => <Logo src="/logos/prometheus.svg" alt="Prometheus" />
export const GitHubActionsLogo = () => <Logo src="/logos/githubactions.svg" alt="GitHub Actions" />
